const foo = (arr) => {
    let bool = false
    arr.forEach(i => {
        console.log(i)
        if (i > 3) {
            bool = true
            return
        }
    })
    return bool
}

const a = [1, 2, 3, 4, 5]
const res = foo(a)
console.log(res)