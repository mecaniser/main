const myOwnRecipe = { 
  leatherStrips: 2, 
  item1: 1, 
  item2: 2, 
  item3:3
}
const myOwnRecipe2 = { 
  ...myOwnRecipe,
  item4: 4, 
  item5: 5, 
  item6: 6, 
  item7: 7
}


console.log(myOwnRecipe);
console.log(myOwnRecipe2);