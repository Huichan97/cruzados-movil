import mongoose, { Schema, Document } from 'mongoose';
import { Counter } from './counter';
import { IMeal } from './meal.model';
import { IUser } from './user.model';

export interface IFood extends Document {
    id: number;
    nombre: string;
    meal: IMeal // almuerzo o desayno etc
    porcion: number;
    foto?: string;
    horaEvento: string; // HH:mm
    ingredientes: mongoose.Types.ObjectId[]; // referencias a Ingredients
    estado: 'Programado' | 'Pendiente' | 'Realizado' | 'Omitido'
    asignadoPor?: IUser // nutri
    asignadoA?: IUser // paciente
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FoodSchema = new Schema<IFood>(
    {
        id: { type: Number, unique: true },
        nombre: { type: String, required: true, trim: true },
        meal: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
        porcion: { type: Number, required: true },
        horaEvento: { type: String, required: true },
        foto: { type: String },
        ingredientes: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
        asignadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        asignadoA: { type: Schema.Types.ObjectId, ref: 'User', required: false },

        estado: {
            type: String,
            default: 'Pendiente',
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
