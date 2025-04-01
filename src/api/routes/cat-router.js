import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});
catRouter.route('/').get(getCat).post(upload.single('file'), postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
/* Sama kuin:
catRouter.route('/id').get(getCatById)
catRouter.route('/id').put(putCat)
catRouter.route('/id').delete(deleteCat)
*/

export default catRouter;
