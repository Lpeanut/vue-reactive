let product = { price: 5, quantity: 2 }
let total = 0
let effect = () => total = product.price * product.quantity

const targetMap = new WeakMap()
function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(effect)
}

function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  let deps = depsMap.get(key)
  if (deps) {
    deps.forEach(effect => effect())
  }
}

track(product, 'quantity')
effect()
console.log(`total is ${total}`)

price = 20
trigger(product, 'quantity')
console.log(`total is ${total}`)

/**
 * track & trigger is currently need us to run it manually,
 * how did that re-run by automaticly
 */