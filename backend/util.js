import jwt from 'jsonwebtoken';
import config from './config';

const getToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      identification: user.identification
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h'
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, code) => {
      if (err) {
        return res.status(401).send({ msg: 'Invalid Token' });
      }
      req.userId = code._id;
      req.token = token;
      return next();
    });
  } else {
    return res.status(401).send({ msg: 'Token is not supplied' });
  }
};

export { getToken, isAuth };
