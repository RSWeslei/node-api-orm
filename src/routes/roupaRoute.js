import { Router } from 'express';
const roupaController = require('../controllers/roupa.controller');
const router = Router();
import { isAuthenticated } from '../utils/isAuthenticated';

router.get('/roupas', roupaController.getAllRoupas)
router.get('/:id', roupaController.getRoupa);
router.post('/create', isAuthenticated, roupaController.createRoupa);
router.post('/delete', isAuthenticated, roupaController.deleteRoupa);
router.post('/update/:id', roupaController.updateRoupa);
router.post('/filter', roupaController.filterRoupas)

export default router;
