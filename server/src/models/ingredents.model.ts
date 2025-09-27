import mongoose, { Schema, Document } from 'mongoose';
import { Counter, getNextSequence } from './counter';

export interface IIngredient extends Document {
    id: number;
    nombre: string;
    descripcion?: string;
    cantidad: number;
    tipoPeso: string /*'kg' | 'gr' | 'lb' | "oz" | "mg" | "ml" | "l" | "taza" | "cda" | "cdta" | 'und';*/,
    calorias: number;
    carbohidratos: number;
    proteinas: number;
    grasas: number;
    fibra: number;
    azucar: number;
    sodio: number;
    createdAt: Date;
    updatedAt: Date;
    state?: boolean;
}

const IngredientSchema = new Schema<IIngredient>(
    {
        id: { type: Number, unique: true },
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        cantidad: { type: Number, required: true },
        tipoPeso: { type: String, /*enum: ['kg', 'gr', 'lb', "oz", "mg", "ml", "l", "taza", "cda", "cdta", 'und'],*/ required: true },
        // Valores nutricionales
        calorias: { type: Number, default: 0 },
        carbohidratos: { type: Number, default: 0 },
        proteinas: { type: Number, default: 0 },
        grasas: { type: Number, default: 0 },
        fibra: { type: Number, default: 0 },
        azucar: { type: Number, default: 0 },
        sodio: { type: Number, default: 0 },
        state: { type: Boolean, default: true },
    },
    { timestamps: true }
);

IngredientSchema.pre('save', async function (next) {
    if (this.isNew) {
        let nextId: number;

        const counter = await Counter.findByIdAndUpdate(
            'ingredientId',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        nextId = counter.seq;

        const exists = await mongoose.models.Ingredient.findOne({ id: nextId });

        if (exists) {
            const last = await mongoose.models.Ingredient.findOne().sort({ id: -1 });
            const lastId = last ? last.id : 0;

            await Counter.findByIdAndUpdate(
                'ingredientId',
                { seq: lastId },
                { new: true, upsert: true }
            );

            nextId = lastId + 1;
        }

        this.id = nextId;
    }
    next();
});
export const Ingredient = mongoose.model<IIngredient>('Ingredient', IngredientSchema);
