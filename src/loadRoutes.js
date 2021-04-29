import productsController from './controllers/ProductsController.js';
import usersController from './controllers/UsersController.js';
import dotenv from 'dotenv';
// import passport from 'passport';
// import { Strategy } from 'passport-local';

import refreshTokensManager from './managers/refreshTokensManager.js';

dotenv.config();

export default function loadRoutes(app) {

  // passport.use(new Strategy((username,password,done) => {
  //   usersController.findUser(username,done,()=>{
  //   });
  // }))

  // app.post('/login',passport.authenticate('local',{ session: false }),(request,response) => {
  //   usersController.findUser(request,response);
  // })


//************************************
//******** Products routes ***********
//************************************

//:Products List

app.get('/products',(request,response) => {
  productsController.listProducts(request,response);
});

//:Add a product

  app.post('/products',(request,response) => {
    productsController.addProduct(request,response);
  });

//:Delete a product

  app.delete('/products/:id',(request,response) => {
    productsController.deleteProduct(request,response);
  });

//:Modify a product

  app.put('/products/:id',(request,response) => {
    productsController.modifyProduct(request,response);
  });


//************************************
//********* Users routes *************
//************************************

//:Users list

  app.get('/users',(request,response)=>{
    usersController.listUsers(request,response);
  });

//:Add an user (signup)

  app.post('/users/signup',(request,response) => {
    usersController.addUser(request,response);
  });

//:Delete an user

  app.delete('/users/:id',(request,response) => {
    usersController.deleteUser(request,response);
  });

//: Modify an user

  app.put('/users/:id',(request,response) => {
    usersController.modifyUser(request,response);
  });

//:Autenthicate an user

  app.post('/users/login',(request,response) => {
    usersController.userLogin(request,response);
  });

//:Refresh token

  app.post('/users/refresh',(request,response) => {
    usersController.refresh(request,response);
  });

  app.get('/tokens', (request,response) => {
    refreshTokensManager.findAllToken((err,tokens) => {
      response.status(200).json(tokens);
    })
  })

}


