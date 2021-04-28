import productsController from './controllers/ProductsController.js';
import usersController from './controllers/UsersController.js';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jwt-simple';

dotenv.config();

const { PORT } = process.env;

const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';
const SECRET = 'mysecret';

export default function loadRoutes(app) {

  passport.use(new Strategy((username,password,done) => {
    usersController.findUser(username,done,()=>{

    });
    // usersController.findUser(token,done);
  }))

  app.use(express.json());

  app.post('/login',passport.authenticate('local',{ session: false }),(request,response) => {
    usersController.findUser(request,response);
  })

  app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
  })

  // PRODUCTS
  app.get('/products',(request,response) => {
    productsController.listProducts(request,response);
  })

  app.post('/products',(request,response) => {
    productsController.addProduct(request,response);
  })

  app.delete('/products/:id',(request,response) => {
    productsController.deleteProduct(request,response);
  })

  app.put('/products/:id',(request,response) => {
    productsController.modifyProduct(request,response);
  })

  // USERS
  app.get('/users',(request,response)=>{
    usersController.listUsers(request,response);
  })

  app.post('/users',(request,response) => {
    usersController.addUser(request,response);
  })


  app.delete('/users/:id',(request,response) => {
    usersController.deleteUser(request,response);
  })

  app.put('/users/:id',(request,response) => {
    usersController.modifyUser(request,response);
  })

}


