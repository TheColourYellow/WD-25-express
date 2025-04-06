import sharp from 'sharp';
import jwt from 'jsonwebtoken';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'img/png') {
    extension = 'png';
  }
  console.log(req.file.mimetype);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  await sharp(req.file.path)
    .resize(160, 160)
    .toFile(`${req.file.path}_thumb.${extension}`);
  console.log(req.file.path);
  next();
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorisation'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export {authenticateToken, createThumbnail};
