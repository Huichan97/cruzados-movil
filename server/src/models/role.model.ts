import mongoose, { Schema } from "mongoose";

export interface IRole extends Document {
    nombre: string;
    descripcion?: string;
}

const RoleSchema = new Schema<IRole>(
    {
        nombre: { type: String, required: true, unique: true, trim: true },
        descripcion: { type: String, trim: true },
    },
    { timestamps: true }
);

export const Role = mongoose.model<IRole>('Role', RoleSchema);