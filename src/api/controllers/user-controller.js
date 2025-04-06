import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-models.js';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  //res.json({message: 'User item updated.'});
  const result = await modifyUser(req.body, req.params.id);
  if (req.user_id) {
    res.status(201);
    res.json({message: 'User added', result});
  } else {
    res.status(404);
  }
};

const deleteUser = async (req, res) => {
  //res.json({message: 'User item deleted.'});
  const result = await removeUser(req.params.id);
  if (result.message) {
    res.status(200);
    res.json({message: 'User deleted', result});
  } else {
    res.status(404);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
