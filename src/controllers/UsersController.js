import usersManager from '../managers/usersManager.js';
import refreshTokenManager from '../managers/refreshTokenManager.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const accessTokenSecret = 'ffdghsSecret';

class UsersController {

  /**
   * Find one user by its username
   */

  findUser(request,response) {
    usersManager.findOneUser(request.body,(err,user) => {
      if (err) {
        response.send({
        error: err.message
      });
      }
      if (!user) {
        return response.send({
          error: "this user doesn't exist"
        });
      }
      bcrypt.compare(request.body.password, user.password, (err, result) => {
        if(err) {
          response.send({
            error: err.message
          });
        }
        if(result) {
          const accessToken = jwt.sign({username: result.username, role: result.role}, accessTokenSecret);
          const refreshToken = jwt.sign({userid: result._id, username: result.username}, accessTokenSecret);
          response.send({
            accessToken
          })
        }
        else {
          response.send({
            error: "the password is not valid"
          });
        }
      })
    })
  }

  /**
   * Liste les users
   */

  listUsers(request,response) {
    usersManager.findAllUsers((err,users) => {
      if(err !== null) {
        response.status(400);
        response.send({
          error: error.message
        });
        return
      }
      response.status(200).json(users);
    });
  }

  /**
   * Ajoute un user
   */

  addUser(request,response) {
      usersManager.addUser(request.body,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return
        }
        response.status(201).end();
      });

  }

  /**
   * Retire un user
   */
  deleteUser(request,response) {
      usersManager.deleteUser(request.params.id,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return
        }
        response.end();
      });
  }

  /**
   * Modifie un user
   */

  modifyUser(request,response) {
      usersManager.modfifyUser(request.body,request.params.id,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return
        }
        response.status(202).end();
      });
  }
}

export default new UsersController();


