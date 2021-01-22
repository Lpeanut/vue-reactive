const product = { price: 5, count: 1, discount: 0.9}
let total = 0
let salePrice = 0
let depMap = new Map()
function track(eff, key) {
  if(!depMap[key]) {
    depMap[key] = new Set()
  }
  depMap[key].add(eff)
}
function trigger(key) {
  if(!depMap[key]) return
  depMap[key].forEach(eff => eff())
}

let effect = () => (total = product.price * product.count)
let effect2 = () => salePrice = product.price * product.discount
effect()
effect2()

track(effect, 'price')
track(effect2, 'discount')
console.log(`total should be 5, actual is ${total}`)
console.log(`salePrice should be 4.5, actual is ${salePrice}`)


product.price = 6
trigger('discount')
console.log(`total should be 6, actual is ${total}`)
console.log(`total should be 5.4, actual is ${salePrice}`)
