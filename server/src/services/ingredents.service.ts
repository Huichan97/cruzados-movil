import { IIngredient, Ingredient } from "../models/ingredents.model";

export class IngredientService {
    static async createIngredient(data: Partial<IIngredient>): Promise<IIngredient> {
        if (!data.nombre || !data.cantidad || !data.tipoPeso) {
            throw { status: 400, message: 'Faltan campos obligatorios' };
        }

        const ingredient = new Ingredient(data);
        return await ingredient.save();
    }

    static async getAllIngredients(): Promise<IIngredient[]> {
        return Ingredient.find();
    }

    static async getIngredientById(id: number): Promise<IIngredient | null> {
        const ing = await Ingredient.findOne({ id });
        if (!ing) throw { status: 404, message: 'Ingrediente no encontrado' };
        return ing;
    }

    static async searchByName(nombre: string): Promise<IIngredient[]> {
        return Ingredient.find({ nombre: { $regex: nombre, $options: 'i' } });
    }

    static async updateIngredient(id: number, data: Partial<IIngredient>): Promise<IIngredient | null> {
        const ing = await Ingredient.findOneAndUpdate({ id }, data, { new: true });
        if (!ing) throw { status: 404, message: 'Ingrediente no encontrado' };
        return ing;
    }

    static async deleteIngredient(id: number): Promise<IIngredient | null> {
        if (!id) throw { status: 400, message: 'ID es requerido' };
        try {
            const ing = await Ingredient.findOneAndUpdate(
                { id },
                { state: false },
                { new: true }
            );
            if (!ing) throw { status: 404, message: 'Ingrediente no encontrado' };
            return ing;
        } catch (error) {
            throw { status: 500, message: 'Error al eliminar el ingrediente' };
        }
    }
}
