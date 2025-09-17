import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Document {
    _id: string;
    seq: number;
}

const CounterSchema = new Schema<ICounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

export const Counter = mongoose.model<ICounter>('Counter', CounterSchema);

export async function getNextSequence(name: string): Promise<number> {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}
