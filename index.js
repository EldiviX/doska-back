import express from "express";
import mongoose from "mongoose";
import multer from 'multer';
import cors from 'cors';

import { registerValidation, loginValidation, adCreateValidation } from './validations.js';

import { UserController, AdController } from "./controllers/index.js";

import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { ServerApiVersion } from 'mongodb';

mongoose.connect("mongodb+srv://viji:mom@cluster0.ib9j0cw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log('Error', error))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cd) => {
        cd(null, "uploads");
    },
    filename: (_, file, cd) => {
        cd(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/login', loginValidation, handleValidationErrors, (req, res) => {
    // Вызов контроллера для выполнения логики входа
    UserController.login(req, res);

    // Установка заголовков CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
});

app.post('/register', registerValidation, handleValidationErrors, (req, res) => {
    // Вызов контроллера для выполнения логики регистрации
    UserController.register(req, res);

    // Установка заголовков CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
});


app.get('/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/ads', AdController.getAll);
app.get('/ads/:id', AdController.getOne);
app.post('/ads', checkAuth, adCreateValidation, handleValidationErrors, AdController.create);
app.delete('/ads/:id', AdController.remove);
app.patch('/ads/:id', adCreateValidation, handleValidationErrors, AdController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
});

