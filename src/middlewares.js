import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'img/png') {
    extension = 'png';
  }

  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`);
  console.log(req.file.path);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  next();
};

export {createThumbnail};
