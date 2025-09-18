import api from "../config/config";

export const getUsers = async () => {
    const res = await api.get('/api/users');
    return res.data;
};

export const createUser = async (data: any) => {
    const res = await api.post('/api/users', data);
    return res.data;
};
