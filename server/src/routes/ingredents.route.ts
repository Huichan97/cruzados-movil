import { Router } from 'express';
import { IngredientController } from '../controllers/ingredents.controller';

const router = Router();

router.post('/', IngredientController.create);
router.get('/', IngredientController.getAll);
router.get('/search', IngredientController.search);
router.get('/:id', IngredientController.getById);
router.put('/:id', IngredientController.update);
router.delete('/:id', IngredientController.delete);

export default router;
