import usersManager from '../managers/usersManager.js';
import refreshTokensManager from '../managers/refreshTokensManager.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const accessTokenSecret = 'ffdghsSecret';

class UsersController {

  /**
   * Find one user by its username
   */

  userLogin(request,response) {
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
          const accessToken = jwt.sign({userid: user._id, username: user.username}, accessTokenSecret);
          const refreshToken = jwt.sign({userid: user._id, username: user.username}, accessTokenSecret);
          refreshTokensManager.addToken({value:refreshToken,user:user},(err) => {
            if(err !== null) {
              // response.status(400);
              // response.send({
              //   error: err.message
              // });
              // return;
            }
          });
          response.send({
            accessToken: accessToken,
            refreshToken: refreshToken
          })
        }
        else {
          response.send({
            error: "the password is not valid"
          });
        }
      })
    });
  };

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
  };

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

  };

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
  };

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
  };

  refresh(request,response) {
    refreshTokensManager.findOneToken(request.body.refreshToken,(err,token) => {
      if(err !== null) {
        response.status(400);
        response.send({
          error: error.message
        });
        return
      }
      const PAYLOAD = jwt.decode(token.value, {complete:true}).payload
      const accessToken = jwt.sign(PAYLOAD, accessTokenSecret);
      response.status(200).send({
        accessToken: accessToken
      });
    })
  }
}

export default new UsersController();


