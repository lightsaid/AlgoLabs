/**
 * Hash Tables CRUD Big O
    - insert O(1)
    - lookup O(1)
    - delete O(1)
    - search O(1)
 */

/**
 *   opt          Arrays    vs     Hash Table
 *   search       O(n)              O(1)
 *   lookup       O(1)              O(1)
 *   push         O(1)              O(1)
 *   insert       O(n)              O(1)
 *   delete       O(n)              O(1)
 */

class HashTable {
    constructor(size) {
        // 初始化一个数组
        this.data = new Array(size)
    }

    // 计算 key 编码值总和取余，得到 HashTable 数组长度
    _hash(key) {
        let sum = 0
        for (let i = 0; i < key.length; i++) {
            sum += key[i].charCodeAt()
        }
        return sum % this.data.length
    }

    // 设值，这里采用嵌套数组来解决冲突问题
    // O(1)
    set(key, value) {
        let index = this._hash(key)
        if (!this.data[index]) {
            this.data[index] = []
        }
        this.data[index].push([key, value])
    }

    // 最快 O(1), 最坏的情况 O(n)
    get(key) {
        let index = this._hash(key)
        let buckets = this.data[index]
        if (buckets.length) {
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i][0] === key) {
                    return buckets[i][1]
                }
            }
        }
        return undefined
    }

    del(key) {
        let index = this._hash(key)
        let buckets = this.data[index]
        let delIndex = -1
        let delItem = undefined
        if (buckets.length) {
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i][0] === key) {
                    delIndex = i
                    delItem = buckets[i][1]
                }
            }
        }
        if (delIndex > -1) {
            buckets.splice(delIndex, 1)
            this.data[index] = buckets
        }
        return delIndex
    }

    // keys 获取所有可以
    keys() {
        let keys = []
        for (let i = 0; i < this.data.length; i++) {
            let buckets = this.data[i]
            if (buckets && buckets.length) {
                for (let j = 0; j < buckets.length; j++) {
                    keys.push(buckets[j][0])
                }
            }
        }
        return keys
    }
}

let htb = new HashTable(10)

// console.log(htb._hash("hha"));  // 5
// console.log(htb._hash("45x")); // 5

htb.set("name", "Tom")
htb.set("age", 99)
htb.set("hha", "哈哈")
htb.set("45x", 100)

// console.log(htb.data)

// console.log(htb.get("name"), htb.get("age"));

// htb.del("age")
// console.log(htb.data)
// console.log(htb.get("name"), htb.get("age"));

// console.log(htb.keys())


// ================



/**
 *  Google Question
    Given an array = [2,5,1,2,3,5,1,2,4]:
    It should return 2

    Given an array = [2,1,1,2,3,5,1,2,4]:
    It should return 1

    Given an array = [2,3,4,5]:
    It should return undefined

    Bonus... What if we had this:
    [2,5,5,2,3,5,1,2,4]
    return 5 because the pairs are before 2,2 (返回5，最新出现)
 * 
 */

// 方案一：找到两个相同的值，将下标相加的到一个min值，最小的min就是最先重复元素
// 核心问题处理下标边界问题
// 下标从0开始： [0, 1, 2, 3, 4, 5, 6]  0+3 == 1+2, 但是 1、2的元素先重复
// 下标从1开始：[1, 2, 3, 4, 5, 6] 1+4 = 2+3 但是 2、3 元素先重复
// 因此采用两重循环从0开始遍历，后面要覆盖前面的
// O(n^2)
function firstRecurringCharacter1(arrs) {
    if (arrs.length === 1) {
        return undefined
    }
    let min = -1
    let value = undefined
    for (let i = 0; i < arrs.length; i++) {
        for (let j = i + 1; j < arrs.length; j++) {
            // 如果单单是这个判断，在应对 [2, 5, 5, 2, 3, 5, 1, 2, 4] 的情况，就会的得到2而不是5
            // if (arrs[i] === arrs[j]){
            //     return arrs[i]
            // }
            if (arrs[j] ===  arrs[i]) {
                let sum = i + j
                if (min === -1) {
                    value = arrs[i]
                    min = sum
                } else if (sum < min) {
                    min = sum
                    value = arrs[i]
                }else if(sum === min){
                    min = sum
                    value = arrs[i]
                }
            }
        }
    }
    return value
}
console.log(firstRecurringCharacter1([2, 5, 1, 2, 3, 5, 1, 2, 4]));  // 2
console.log(firstRecurringCharacter1([2, 1, 1, 2, 3, 5, 1, 2, 4]));  // 1
console.log(firstRecurringCharacter1([2, 3, 4, 5]));                 // undefined
console.log(firstRecurringCharacter1([2, 5, 5, 2, 3, 5, 1, 2, 4]));  // 5


// 方案二：一般这种查重问题，利用 Hash Table 存储元素时 key 唯一性更快解决问题 
// O(n)
function firstRecurringCharacter2(arrs) {
    if (arrs.length === 1) {
        return undefined
    }
    let obj = {}
    for (let i=0;i<arrs.length; i++) {
        if (obj[arrs[i]] !== undefined){
            return arrs[i]
        }else{
            obj[arrs[i]] = true
        }
    }
}

// console.log(firstRecurringCharacter2([2, 5, 1, 2, 3, 5, 1, 2, 4]));  // 2
// console.log(firstRecurringCharacter2([2, 1, 1, 2, 3, 5, 1, 2, 4]));  // 1
// console.log(firstRecurringCharacter2([2, 3, 4, 5]));                 // undefined
// console.log(firstRecurringCharacter2([2, 5, 5, 2, 3, 5, 1, 2, 4]));  // 5


// =========================================


// 将上面问题查查重复，改成去重
// 1. 在 JS 中最省代码的方式是使用 new Set(arr)
// 2. 定义一个新的数组，利用 includes、 indexOf 或 in 关键字，当元素不存在时push
