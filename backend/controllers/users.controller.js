import User from '../models/userModel';
import { getToken } from '../util';

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const signinUser = await User.findOne({ email: email });
    if (!signinUser) {
      res.status(401).send({ msg: 'User does not exist!' });
    } else {
      const isEqual = await signinUser.matchPassword(
        password,
        signinUser.password
      );
      if (!isEqual) {
        res.status(401).send({ msg: 'Password is incorrect' });
      } else {
        res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          identification: signinUser.identification,
          cellphone: signinUser.cellphone,
          token: getToken(signinUser)
        });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: 'Server error', error });
  }
};

const signup = async (req, res) => {
  try {
    const errors = [];
    const {
      name,
      email,
      identification,
      cellphone,
      password,
      confirm_password
    } = req.body;
    if (password != confirm_password) {
      errors.push({
        msg: 'Passwords do not match'
      });
    }
    if (password.length < 4) {
      errors.push({
        msg: 'Passwords must be at least 4 characters'
      });
    }
    if (errors.length > 0) {
      res.status(401).send({ error_msg: errors });
    } else {
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        res.status(401).send({ error_msg: 'The email is already in use' });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          identification,
          cellphone
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.send({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          identification: newUser.identification,
          cellphone: newUser.cellphone,
          token: getToken(newUser)
        });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: 'Server error', error });
  }
};

export { signup, signin };
