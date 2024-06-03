import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({min: 5}),
    body('name', 'Имя должно быть больше 1 символа').isLength({min: 1}),
    body('avatarUrl', 'Некорректная ссылка на аватар').optional().isURL(),
]

export const adCreateValidation = [
    body('title', 'Укажите название').isLength({min: 1}).isString(),
    body('type', 'Укажите тип').isLength({min: 1}).isString(),
    body('category', 'Выберите категорию').isString(),
    body('price', 'Укажите цену').isNumeric(),
    body('phone', 'Укажите номер телефона').isLength({min: 10}),
    body('phone', 'Некорректный номер телефона').isLength({max: 10}).isNumeric(),
    body('location', 'Укажите населённый пункт').isLength({min: 1}).isString(),
    // body('imageUrl', 'Некорректная ссылка на изображение').optional().isString(),
]