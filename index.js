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

const allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://5.35.95.133');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
};

app.use(express.json());
app.use(cors());
app.use(allowCors);
app.use('/uploads', express.static('uploads'));

app.post('/login', allowCors, loginValidation, handleValidationErrors, UserController.login);
app.post('/register', allowCors, registerValidation, handleValidationErrors, UserController.register);
app.get('/me', allowCors, checkAuth, UserController.getMe);

app.post('/upload', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://5.35.95.133');
    next();
}, checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/ads', allowCors, AdController.getAll);
app.get('/ads/:id', allowCors, AdController.getOne);
app.post('/ads', allowCors, checkAuth, adCreateValidation, handleValidationErrors, AdController.create);
app.delete('/ads/:id', allowCors, AdController.remove);
app.patch('/ads/:id', allowCors, adCreateValidation, handleValidationErrors, AdController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
});

