const { fruits } = require('./data.js');

const index = () => {
    for (const fruit of fruits) {
        console.log(fruit);
    }
};

const store = (fruitName) => {
    fruits.push(fruitName);
    index(); 
};

const update = (fruitIndex, newFruit) => { 
    if (fruitIndex >= 0 && fruitIndex < fruits.length) {
        fruits[fruitIndex] = newFruit;
    }
    index(); 
};

const destroy = (fruitIndex) => { 
    if (fruitIndex >= 0 && fruitIndex < fruits.length) {
        fruits.splice(fruitIndex, 1);
    }
    index();
};

module.exports = { index, store, update, destroy };