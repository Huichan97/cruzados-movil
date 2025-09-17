import mongoose, { Schema, Document } from 'mongoose';
import { Counter } from './counter';

export interface IFood extends Document {
    id: number;
    tipo: 'desayuno' | 'almuerzo' | 'cena' | 'merienda' | 'ayuno';
    porcion: number;
    foto?: string;
    horaEvento: string; // HH:mm
    ingredientes: mongoose.Types.ObjectId[]; // referencias a Ingredients
    estado: string; // programado | pendiente | comido
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FoodSchema = new Schema<IFood>(
    {
        id: { type: Number, unique: true },
        tipo: {
            type: String,
            enum: ['desayuno', 'almuerzo', 'cena', 'merienda', 'ayuno'],
            required: true,
        },
        porcion: { type: Number, required: true },
        horaEvento: { type: String, required: true },
        foto: { type: String },
        ingredientes: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
        estado: {
            type: String,
            default: 'pendiente', // valores esperados: pendiente | programado | comido
        },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Middleware para id autoincremental con auto-healing
FoodSchema.pre('save', async function (next) {
    if (this.isNew) {
        let nextId: number;

        const counter = await Counter.findByIdAndUpdate(
            'foodId',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        nextId = counter.seq;

        const exists = await mongoose.models.Food.findOne({ id: nextId });

        if (exists) {
            const last = await mongoose.models.Food.findOne().sort({ id: -1 });
            const lastId = last ? last.id : 0;

            await Counter.findByIdAndUpdate(
                'foodId',
                { seq: lastId },
                { new: true, upsert: true }
            );

            nextId = lastId + 1;
        }
        this.id = nextId;
    }
    next();
});

export const Food = mongoose.model<IFood>('Food', FoodSchema);
