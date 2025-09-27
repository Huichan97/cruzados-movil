import { Router } from 'express';
import Users from './user.route';
import Ingredents from './ingredents.route';
import foodRoutes from './food.route';
import mealRoutes from './meal.route';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido al backend de Cruzados 🚀' });
});

router.use('/users', Users);
router.use('/ingredents', Ingredents);
router.use('/foods', foodRoutes);
router.use('/meals', mealRoutes);

export default router;
