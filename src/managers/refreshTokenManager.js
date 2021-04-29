import refreshToken from '../model/RefreshToken.js';

class refreshTokenManager {

  findOneToken(token, callback) {
    refreshToken.findOne({ value: token.value }, (err,token) => {
      callback(err,token)
    })
  }

  findAllToken(callback) {
    refreshToken.find({}, (err,tokens) => {
      callback(err,tokens);
    });
  }

  addToken(request,callback) {
    const newToken = new refreshToken({...request});
    newToken.save((err)=>{
      callback(err);
    });
  }


  deleteToken(idToDelete,callback) {
    refreshToken.deleteOne({_id:idToDelete}, (err) => {
      callback(err);
    });
  }
}
