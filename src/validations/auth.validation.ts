import { body } from "express-validator";

export default [
    body("email", "Введите email")
        .isEmail()
        .withMessage("Введите ваш email корректно")
        .isLength({ min: 10, max: 40 })
        .withMessage("Допустимое кол-во слов email от 10 до 40"),
    body("fullname", "Введите fullname")
        .isString()
        .isLength({ min: 2, max: 40 })
        .withMessage("Допустимое кол-во слов fullname от 2 до 40"),
    body("username", "Введите username")
        .isString()
        .isLength({ min: 2, max: 40 })
        .withMessage("Допустимое кол-во слов username от 2 до 40"),
    body("password", "Введите password")
        .isString()
        .isLength({ min: 2 })
        .withMessage("Допустимое кол-во слов password от 6")
        .custom((value, { req }) => {
            if (value !== req.body.password_confirm) {
                throw new Error("Пароли не совпадают");
            } else {
                return value;
            }
        })
]
