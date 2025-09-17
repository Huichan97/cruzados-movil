import { IUser, User } from "../models/user.model";

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    if (!data.nombre || !data.genero || !data.correo || !data.contacto || !data.fechaNacimiento) {
      throw { status: 400, message: 'Faltan campos obligatorios' };
    }

    const existing = await User.findOne({ correo: data.correo });
    if (existing) {
      throw { status: 400, message: 'Correo ya registrado' };
    }

    const user = new User(data);
    return await user.save();
  }

  static async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  static async getUserById(id: number): Promise<IUser | null> {
    const user = await User.findOne({ id });
    if (!user) throw { status: 404, message: 'Usuario no encontrado' };
    return user;
  }

  static async searchByName(nombre?: string, apellido?: string): Promise<IUser[]> {
    const query: any = {};
    if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
    if (apellido) query.apellido = { $regex: apellido, $options: 'i' };

    return User.find(query);
  }

  static async updateUser(id: number, data: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findOneAndUpdate({ id }, data, { new: true });
    if (!user) throw { status: 404, message: 'Usuario no encontrado' };
    return user;
  }

  static async deleteUser(id: number): Promise<IUser | null> {
    if (!id) throw { status: 400, message: 'ID es requerido' };
    try {
      const user = await User.findOneAndUpdate(
        { id },
        { state: false },
        { new: true }
      );
      if (!user) throw { status: 404, message: 'Usuario no encontrado' };
      return user;
    } catch (error) {
      throw { status: 500, message: 'Error al eliminar el usuario' };
    }
  }
}
