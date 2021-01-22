let price = 5
let quantity = 2
let total = 0
let effect = () => total = price * quantity

const depsMap = new Map()

function track(key) {
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

track('quantity')
effect()
console.log(`total is ${total}`)

price = 20
trigger('quantity')
console.log(`total is ${total}`)
/**
 * What if we have multiple reactive objects that each need to track effects?
 */