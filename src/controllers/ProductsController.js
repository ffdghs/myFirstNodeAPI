// import model from '../model/model.js';
import { error } from 'node:console';
import productsManager from '../managers/productsManager.js';

class ProductsController {

  /**
   * Liste les produits
   */

  listProducts(request,response) {
    productsManager.readDB((err,products) => {
      if(err !== null) {
        response.status(400);
        response.send({
          error: error.message
        });
        return;
      }
      response.status(200).json(products);
    });
  }

  /**
   * Ajoute un produit de la liste
   */

  addProduct(request,response) {
      productsManager.writeDB(request.body,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return;
        }
        response.status(201).end();
      });

  }

  /**
   * Retire un produit de la liste
   */
  deleteProduct(request,response) {
      productsManager.deleteDB(request.params.id,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return;
        }
        response.end();
      });
  }

  /**
   * Modifie un produit de la liste
   */
  modifyProduct(request,response) {
      productsManager.modfifyDB(request.body,request.params.id,(err) => {
        if(err !== null) {
          response.status(400);
          response.send({
            error: err.message
          });
          return;
        }
        response.status(204).end();
      });
  }
}

export default new ProductsController();


