import Ajv from 'ajv';
import mongoose from 'mongoose';

const Article = mongoose.model('Article', {
  name: String,
  price: Number,
})

const ajv = new Ajv();

const SCHEMA = {
  type: "object",
  properties: {
    name: { type : "string",
    "isNotEmpty": true,
    "minLength" : 1
    },
    price: { type : "number"}
  },
  // required: ["name","price"],
  additionalProperties: false
}

const validate = ajv.compile(SCHEMA);

class Model {
  constructor() {
  }

  readDB(response) {
    Article.find({}, (err,arr) => {
      // console.log('liste des articles '+arr);
      response.json(arr);
    });
  }


  writeDB(request) {
    const newArticle = new Article({...request});
    const VALID = validate(request);
    if(!VALID) {
      throw new Error('La requête n\'est pas valide');
    }
    newArticle.save((err)=>{
      if(err) return console.log(err);
    })
  }

  deleteDB(idToDelete) {
    Article.deleteOne({_id:idToDelete}, (err) => {
      if(err) return handleError(err)
    })
  }

  modfifyDB(request,idToUpdate) {
    const VALID = validate(request);
    if(!VALID) {
      throw new Error('La requête n\'est pas valide');
    }
    Article.updateOne({ _id : idToUpdate}, {...request},(err) => {
      if(err) return handleError(err);
    });
  }
}

export default new Model();
