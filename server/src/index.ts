import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';
// ADD THIS
import cors from 'cors';


const app = express();
const port = 3001;
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb+srv://lucyfurt:lulu1010@cluster0.fmmd1rt.mongodb.net/test')
  .then(() => {
    const port = process.env.PORT || 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
   // app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));
    app.use(express.json());
    app.use(router);
    app.use(cors());
    server.listen(port, () => {
      console.log(`🚀 servirdor esta rodando em http://localhost:${port}`);
    });
  })
  .catch(() => console.log('erro'));





