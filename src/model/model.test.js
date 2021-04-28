const model = require('./model');

test('ajout d\'un produit sans nom', () => {
  expect(() => { model.writeDB({
		price: 12
  })}).toThrow('La requête n\'est pas valide')
})
test('ajout d\'un produit sans prix', () => {
  expect(() => { model.writeDB({
    name : "test"
  })}).toThrow('La requête n\'est pas valide')
})
test('ajout d\'un produit avec plus de propriétés qu\'attendues', () => {
  expect(() => { model.writeDB({
    name : "test",
    price: 12,
    value: 'test'
  })}).toThrow('La requête n\'est pas valide')
})

