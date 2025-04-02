import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import createThumbnail from '../../middlewares.js';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

/*catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);*/
catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
//.post(postCat);
/* Sama kuin:
catRouter.route('/id').get(getCatById)
catRouter.route('/id').put(putCat)
catRouter.route('/id').delete(deleteCat)
*/

export default catRouter;
