import RefreshToken from '../model/RefreshToken.js';

class RefreshTokensManager {

  findOneToken(token, callback) {
    RefreshToken.findOne({ value: token }, (err,token) => {
      callback(err,token)
    })
  }

  findAllToken(callback) {
    RefreshToken.find({}, (err,tokens) => {
      callback(err,tokens);
    });
  }

  addToken(request,callback) {
    const newToken = new RefreshToken({...request});
    newToken.save((err)=>{
      callback(err);
    });
  }


  deleteToken(idToDelete,callback) {
    RefreshToken.deleteOne({_id:idToDelete}, (err) => {
      callback(err);
    });
  }
}

export default new RefreshTokensManager();
