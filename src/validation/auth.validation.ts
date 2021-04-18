import { body } from 'express-validator';

const emailLength = { min: 10, max: 40 };

const fullnameLength = { min: 2, max: 40 };

const usernameLength = { min: 2, max: 40 };

const passwordLength = { min: 6 };

export default [
  body('email', 'Введите email')
    .isEmail()
    .withMessage('Введите email корректно')
    .isLength(emailLength)
    .withMessage(`Допустимое кол-во символов в почте от ${emailLength.min} до ${emailLength.max}`),
  body('fullname', 'Введите имя')
    .isString()
    .isLength(fullnameLength)
    .withMessage(`Допустимое кол-во символов в имени от ${fullnameLength.min} до ${fullnameLength.max}`),
  body('username', 'Введите логин')
    .isString()
    .isLength(usernameLength)
    .withMessage(`Допустимое кол-во символов в логине от ${usernameLength.min} до ${usernameLength.max}`),
  body('password', 'Введите пароль')
    .isString()
    .isLength(passwordLength)
    .withMessage(`Допустимое кол-во символов в пароле от ${passwordLength.min}`)
    .custom((value, { req }) => {
      if (value !== req.body.password_confirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    })
];
