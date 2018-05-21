// declaring constants
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

// connect to db
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// creating a schema 
const recipeSchema = new Schema({
  title: { 
    type: String, 
    required: true,
    unique: true 
  },
  level: { 
    type: String,
    enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ]
  },
  ingredients: [String],
  cousine: { 
    type: String,
    required: true 
  },
  dishType: { 
    type: String,
    enum: [ 'Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String, 
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: { 
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date, 
    default: Date.now 
  }, 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
  title: 'Gulas',
  level: 'UltraPro Chef',
  ingredients: ['pepper', 'flour', 'beef meet'],
  cousine: 'Czech',
  dishType: 'Dish',
  duration: 160, 
 })
 .then((recipe) => { console.log('The new recipe was created.', recipe.title) })
 .catch((err) => { console.log('A strange error occured.', err) });


 Recipe.insertMany(data)
  .then((recipes) => {
      recipes.forEach((recipe) => {
        console.log('The new recipe was created.', recipe.title); 
      })
      /*
      for (i=0; i < recipes.length; i++) {
        console.log('The new recipe was created.', recipes[0].title);
      } */
    }
  )
  .catch((err) => { console.log('A strange error occured.', err) });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((recipe) => { console.log ('Recipe was successfully updated.')})
  .catch((err) => { console.log('A strange error occured.', err) });

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((recipe) => {console.log('The recipe was deleted.')})
  .catch((err) => {console.log('Strange error occured when trying to delete the document')}); 