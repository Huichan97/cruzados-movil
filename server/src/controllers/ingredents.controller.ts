import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredents.service';

export class IngredientController {
    static async create(req: Request, res: Response) {
        try {
            const ing = await IngredientService.createIngredient(req.body);
            return res.status(201).json({message: "ingrediente creado", data: ing});
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const ings = await IngredientService.getAllIngredients();
            return res.json({message: "ingredientes encontrados", data: ings});
        } catch {
            return res.status(500).json({ error: 'Error al obtener ingredientes' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const ing = await IngredientService.getIngredientById(id);
            return res.json({message: "ingrediente encontrado", data: ing});
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async search(req: Request, res: Response) {
        try {
            const { nombre } = req.query;
            const ings = await IngredientService.searchByName(nombre as string);
            return res.json({message: "ingrediente encontrado", data: ings});
        } catch {
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const ing = await IngredientService.updateIngredient(id, req.body);
            return res.json({message: "ingrediente actualizado", data: ing});
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const ing = await IngredientService.deleteIngredient(id);
            return res.json({   message: `Ingrediente eliminado: ${ing?.nombre}`});
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
}
