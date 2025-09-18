import api from "../config/config";

export const getIngredients = async () => {
    const res = await api.get('/api/ingredents');
    console.log(res.data);
    return res.data;
};

export const createIngredient = async (data: any) => {
    const res = await api.post('/api/ingredents', data);
    console.log(res.data);
    return res.data.ingredients;
};
