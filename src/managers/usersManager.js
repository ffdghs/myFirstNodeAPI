import User from '../model/User.js';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import bcrypt from 'bcrypt';

class UsersManager {
  constructor() {
  }

  findOneUser(user, callback) {
    User.findOne({ username: user }, (err,user) => {
      callback(err,user)
    })
  }

  findAllUsers(callback) {
    User.find({}, (err,users) => {
      callback(err,users);
    });
  }

  addUser(request,callback) {
    const saltRounds = 10;
    const plainPassword = request.password;
    bcrypt.hash(plainPassword, saltRounds, (err,hash) => {
      const newUser = new User({...request});
      newUser.password = hash;
      newUser.save((err)=>{
        callback(err);
      });
    })
  }

  deleteUser(idToDelete,callback) {
    User.deleteOne({_id:idToDelete}, (err) => {
      callback(err);
    });
  }

  modfifyUser(request,idToUpdate,callback) {
    if(request.password !== null) {
      const saltRounds = 10;
      const plainPassword = request.password;
      bcrypt.hash(plainPassword, saltRounds, (err,hash) => {
        User.updateOne({ _id : idToUpdate}, {...request,"password":hash},(err) => {
          callback(err);
        });
      })
    }
    else {
      User.updateOne({ _id : idToUpdate}, {...request},(err) => {
        callback(err);
      });
    }
  }
}

export default new UsersManager();
