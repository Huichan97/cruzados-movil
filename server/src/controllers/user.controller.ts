import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            return res.status(201).json({ message: "Usuario creado!", Data: user });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message || 'Error en servidor' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            return res.json({ message: "Usuarios existentes", Data: users });
        } catch (err: any) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.getUserById(id);
            return res.json({ message: "Usuario encontrado", Data: user });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async search(req: Request, res: Response) {
        try {
            const { nombre, apellido } = req.query;
            const users = await UserService.searchByName(
                nombre as string,
                apellido as string
            );
            return res.json({ message: "Usuario encontrado", Data: users });
        } catch (err: any) {
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.updateUser(id, req.body);
            return res.json({ message: 'Usuario actualizado', data: user });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.deleteUser(id);
            return res.json({ message: 'Usuario eliminado', data: user });
        } catch (err: any) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
}
