import { IMeal, Meal } from "../models/meal.model";

export const createMeal = async (data: Partial<IMeal>): Promise<IMeal> => {
    if (!data.nombre) {
        throw { status: 400, message: 'Faltan campos obligatorios' };
    }

    const meal = new Meal(data);
    return await meal.save();
}

export const getAllMeals = async (): Promise<IMeal[]> => {
    return Meal.find();
}