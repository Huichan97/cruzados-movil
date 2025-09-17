import mongoose, { Schema, Document } from 'mongoose';
import { Counter, getNextSequence } from './counter';

export interface IUser extends Document {
    id: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: 'M' | 'F' | 'O'; // M=Masculino, F=Femenino, O=Otro
    foto?: string;
    state?: boolean;
    contacto: string;
    correo: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        id: { type: Number, unique: true },
        nombre: { type: String, required: true, trim: true },
        apellido: { type: String, required: false, trim: true },
        fechaNacimiento: { type: Date, required: true },
        genero: { type: String, enum: ['M', 'F', 'O'], required: true },
        foto: { type: String },
        contacto: { type: String, required: true },
        state: { type: Boolean, default: true },
        correo: { type: String, required: true, unique: true, lowercase: true, trim: true }
    },
    { timestamps: true }
);

// Middleware para autoincrementar `id`
UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        let nextId: number;

        // Pedimos el próximo número
        const counter = await Counter.findByIdAndUpdate(
            'userId',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        nextId = counter.seq;

        // Revisamos si ya existe un documento con ese id
        const exists = await mongoose.models.User.findOne({ id: nextId });

        if (exists) {
            // Buscamos el último id real
            const last = await mongoose.models.User.findOne().sort({ id: -1 });
            const lastId = last ? last.id : 0;

            // Ajustamos el contador al último id
            await Counter.findByIdAndUpdate(
                'userId',
                { seq: lastId },
                { new: true, upsert: true }
            );

            nextId = lastId + 1;
        }

        this.id = nextId;
    }
    next();
});

export const User = mongoose.model<IUser>('User', UserSchema);
