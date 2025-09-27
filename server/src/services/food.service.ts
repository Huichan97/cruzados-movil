import { Food, IFood } from "../models/food.model";
import { Ingredient } from "../models/ingredents.model";

export class FoodService {
    static async createFood(data: Partial<IFood>): Promise<IFood> {
        if (!data.nombre || !data.meal || !data.porcion || !data.horaEvento) {
            throw { status: 400, message: 'Faltan campos obligatorios' };
        }

        if (data.ingredientes && data.ingredientes.length > 0) {
            const count = await Ingredient.countDocuments({ _id: { $in: data.ingredientes } });
            if (count !== data.ingredientes.length) {
                throw { status: 400, message: 'Alguno de los ingredientes no existe' };
            }
        }

        const food = new Food(data);
        await food.save();

        const savedFood = await Food.findById(food._id)
            .populate("meal", "nombre")  // solo campo nombre
            .populate("ingredientes", "nombre calorias proteinas grasas carbohidratos")
            .populate("asignadoPor", "nombre email")
            .populate("asignadoA", "nombre email");

        if (!savedFood) {
            throw { status: 500, message: 'Error al crear la comida' };
        }

        return savedFood;

    }

    static async getAllFoods(): Promise<IFood[]> {
        return Food.find({ state: true }).populate('ingredientes',  "nombre calorias proteinas grasas carbohidratos").populate("meal", "nombre");
    }

    static async getFoodById(id: number): Promise<IFood | null> {
        const food = await Food.findOne({ id, state: true }).populate('ingredientes');
        if (!food) throw { status: 404, message: 'Comida no encontrada' };
        return food;
    }

    static async updateFood(id: number, data: Partial<IFood>): Promise<IFood | null> {
        const food = await Food.findOneAndUpdate({ id, state: true }, data, { new: true }).populate('ingredientes');
        if (!food) throw { status: 404, message: 'Comida no encontrada' };
        return food;
    }

    static async updateIngredients(id: number, ingredientes: string[]): Promise<IFood | null> {
        const count = await Ingredient.countDocuments({ _id: { $in: ingredientes } });
        if (count !== ingredientes.length) {
            throw { status: 400, message: 'Alguno de los ingredientes no existe' };
        }

        const food = await Food.findOneAndUpdate(
            { id, state: true },
            { ingredientes },
            { new: true }
        ).populate('ingredientes');

        if (!food) throw { status: 404, message: 'Comida no encontrada' };
        return food;
    }

    static async changeEstado(id: number, estado: string): Promise<IFood | null> {
        const validEstados = ['pendiente', 'programado', 'comido'];
        if (!validEstados.includes(estado)) {
            throw { status: 400, message: 'Estado no válido' };
        }

        const food = await Food.findOneAndUpdate(
            { id, state: true },
            { estado },
            { new: true }
        ).populate('ingredientes');

        if (!food) throw { status: 404, message: 'Comida no encontrada' };
        return food;
    }

    static async deleteFood(id: number): Promise<IFood | null> {
        const food = await Food.findOneAndUpdate(
            { id, state: true },
            { state: false },
            { new: true }
        );
        if (!food) throw { status: 404, message: 'Comida no encontrada' };
        return food;
    }
}
