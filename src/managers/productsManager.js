import Product from '../model/Product.js';

class ProductsManager {
  constructor() {
  }

  readDB(callback) {
    Product.find({}, (err,products) => {
      callback(err,products);
    });
  }

  writeDB(request,callback) {
    const newArticle = new Product({...request});
    newArticle.save((err)=>{
      callback(err);
    });
  }

  deleteDB(idToDelete,callback) {
    Product.deleteOne({_id:idToDelete}, (err) => {
      callback(err);
    });
  }

  modfifyDB(request,idToUpdate,callback) {
    Product.updateOne({ _id : idToUpdate}, {...request},(err) => {
      callback(err);
    });
  }
}

export default new ProductsManager();
