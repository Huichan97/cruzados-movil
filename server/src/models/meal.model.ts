import mongoose, { Schema } from "mongoose";

export interface IMeal extends Document {
  nombre: string;        // Ej: "Desayuno", "Almuerzo", "Cena", "Colación"
  descripcion?: string;  // Texto opcional
}

const MealSchema = new Schema<IMeal>(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    descripcion: { type: String, trim: true },
  },
  { timestamps: true }
);
export const Meal = mongoose.model<IMeal>('Meal', MealSchema);