import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createFood, getFoods } from '../routes/food.route';

type Food = {
  id: number;
  tipo: string;
  porcion: number;
  horaEvento: string;
  estado: string;
  ingredientes: any[];
};

type FoodContextType = {
  foods: Food[];
  loading: boolean;
  error: string | null;
  fetchFoods: () => Promise<void>;
  addFood: (data: Partial<Food>) => Promise<void>;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await getFoods();
      setFoods(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar comidas');
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (data: Partial<Food>) => {
    try {
      setLoading(true);
      const newFood = await createFood(data);
      setFoods((prev) => [...prev, newFood]);
    } catch (err: any) {
      setError(err.message || 'Error al crear comida');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading, error, fetchFoods, addFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) throw new Error('useFood debe usarse dentro de FoodProvider');
  return context;
};
