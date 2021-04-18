import { body } from 'express-validator';

const emailLength = {
  min: 10,
  max: 40
};

const fullnameLength = {
  min: 2,
  max: 40
};

const usernameLength = {
  min: 2,
  max: 40
};

const passwordLength = {
  min: 6
};

export default [
  body('email', 'Введите email')
    .isEmail()
    .withMessage('Введите ваш email корректно')
    .isLength(emailLength)
    .withMessage(`Допустимое кол-во слов email от ${emailLength.min} до ${emailLength.max}`),
  body('fullname', 'Введите fullname')
    .isString()
    .isLength(fullnameLength)
    .withMessage(`Допустимое кол-во слов fullname от ${fullnameLength.min} до ${fullnameLength.max}`),
  body('username', 'Введите username')
    .isString()
    .isLength(usernameLength)
    .withMessage(`Допустимое кол-во слов username от ${usernameLength.min} до ${usernameLength.max}`),
  body('password', 'Введите password')
    .isString()
    .isLength(passwordLength)
    .withMessage(`Допустимое кол-во слов password от ${passwordLength.min}`)
    .custom((value, { req }) => {
      if (value !== req.body.password_confirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    })
];
