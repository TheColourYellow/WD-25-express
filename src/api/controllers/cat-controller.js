import {addCat, findCatById, listAllCats} from '../models/cat-models.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log(`Body data: ${req.body}`);
  console.log(req.file);
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  console.log(`Form data: $${result}`);
  //console.log(`File data: ${req.file}`);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (res) => {
  res.json({message: 'Cat item updated.'});
  //const result = putCat(req.body)
};

const deleteCat = (res) => {
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
