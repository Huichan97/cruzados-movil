import api from '../config/config';

export const getFoods = async () => {
    const res = await api.get('/api/foods');
    console.log("Respueta api food", res);
    return res.data;
};

export const createFood = async (data: any) => {
    const res = await api.post('/api/foods', data);
    return res.data;
};

export const getFoodById = async (id: number) => {
    const res = await api.get(`/api/foods/${id}`);
    return res.data;
}