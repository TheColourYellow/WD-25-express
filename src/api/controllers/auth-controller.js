import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {logIn} from '../models/user-models.js';

const postLogIn = async (req, res) => {
  const user = await logIn(req.body.username);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const passwordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordValid) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

export {postLogIn, getMe};
