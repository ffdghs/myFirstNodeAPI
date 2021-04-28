import usersManager from '../managers/usersManager.js';

class UsersController {

  /**
   * Liste les users
   */
  findUser(user,done,callback) {
    usersManager.findOneUser(user,(err,user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }



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


