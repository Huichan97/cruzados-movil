import { Router } from 'express';
import { FoodController } from '../controllers/food.controller';

const router = Router();

router.post('/', FoodController.create);
router.get('/', FoodController.getAll);
router.get('/:id', FoodController.getById);
router.put('/:id', FoodController.update);
router.put('/:id/ingredientes', FoodController.updateIngredients);
router.put('/:id/estado', FoodController.changeEstado);
router.post('/:id', FoodController.delete);

export default router;
