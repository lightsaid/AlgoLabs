
/**
 * Array CRUD Big O
    - lookup   O(1)
    - push     O(1)
    - insert   O(n)
    - delete   O(n)

    数组在内存中是连续的一块内存。
    静态数组一起开始就声明有多少个元素，后续不在添加；（内存固定）
    动态数组根据数据元素个数，进行分配内存、追加内存或者重新分配内存。
 */


/**
 * Array
 * 实现一个JavaScript数组功能
 * 使用 class 方法实现，存储数据使用Object，以 number 类型为 key
 */
 class Array {
    constructor() {
        this.length = 0;
        this.data = Object.create(null);
    }

    get(index) {
        return this.data[index]
    }

    push(item) {
        this.data[this.length] = item
        this.length++
        return this.data
    }

    pop() {
        let item = this.data[this.length - 1]
        delete this.data[this.length - 1]
        this.length--
        return item
    }

    delete(index) {
        // NOTE: 从 index 开始遍历
        for (let i = index; i < this.length - 1; i++) {
            // 从index开始，后面元素往前移一位，删除最后一个元素
            this.data[i] = this.data[i + 1]
        }
        delete this.data[this.length - 1]
        this.length--
    }
}

const arr = new Array()
arr.push("jack")
arr.push("tome")
arr.push("zhangsan")
arr.push("lisi")
// console.log(arr)
// console.log(arr.get(0))
// console.log(arr.pop())
// console.log(arr)
// arr.delete(2)
// console.log(arr)


/**
 * 反转字符串
 * 在编程的世界里，遇到string的问题几乎都可以转换成数组来处理，其实string可以理解为byte数组
 */
function reverse(str) {
    // 检查输入
    if (!str || str.length < 2 || typeof str !== 'string') {
        return str
    }
    let strs = str.split("")
    return strs.reverse().join("")
}
// console.log(reverse("hello"))


function reverse2(str) {
    // 检查输入
    if (!str || str.length < 2 || typeof str !== 'string') {
        return str
    }
    let tmp = []
    for (let i = str.length; i >= 0; i--) {
        tmp.push(str[i])
    }
    return tmp.join("")
}
// console.log(reverse2("hello"))

/**
 * Merge Sorted Arrays (归并排序数组)
 * mergeSortedArrays([0,3,4,31],[4,6,30]) 输出：[0, 3, 4, 4, 6, 30, 31]
 * 解题思路: 
 * 1. 优先将 left 数组 和 right 数组分别冒泡排序
 * 2. 从left数组和right数组依次取出一个元素做比较，按大小push。
 */
function mergeSortedArrays(left, right) {
    left = bubbleSort(left)
    right = bubbleSort(right)

    if (left.length === 0) {
        return right
    }
    if (right.length === 0) {
        return left
    }

    // 验证完毕，两个数组都有元素
    let leftItem = left[0]
    let rightItem = right[0]
    let x = 1;
    let y = 1;
    let result = []
    // 假设 left、right 数组元素都不是 undefined
    while (leftItem || rightItem) {
        // undefined < undefined -> false 死循环
        // undefined < 2 -> false  因此当 leftItem = undefined, rightItem 有值时也死循环
        // if (leftItem < rightItem) {
        if (rightItem === undefined || leftItem < rightItem) { // 解决死循环问题
            result.push(leftItem)
            leftItem = left[x]
            x++
        } else {
            result.push(rightItem)
            rightItem = right[y]
            y++
        }
    }

    return result
}
// console.log(undefined < undefined) // false
// console.log(undefined < 2) // false
// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]))
// console.log(mergeSortedArrays([1, 7, 9, 2], [4, 3, 6, 2, 5, 8]))



/**
 * bubbleSort
 * 冒泡排序，相邻两个元素两两对比，交换
 */
function bubbleSort(arr) {
    let maxIndex = arr.length - 1;
    for (let i = maxIndex; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// console.log(bubbleSort([1, 7, 9, 2, 3]))
// console.log(bubbleSort([4, 3, 6, 2, 5, 8, 9, 10, 5, 7]))
// console.log(bubbleSort([4, 3, 6, 2, 5, 8, 9, 10, 5, 7, 1]))

/**
 * SelectionSort
 * 使用选择排序来实现相同功能
 * 从最右开始，依次取出一个元素和其他元素对比，如果大于这个元素则存放到这个下标里
 */
function SelectionSort(arr) {
    let maxIndex = arr.length - 1
    for (let i = maxIndex; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            // console.log(`[${arr[i]}, ${arr[j]}]`)
            if (arr[i] < arr[j]) {
                let tmp = arr[i]
                arr[i] = arr[j]
                arr[j] = tmp
            }
        }
        // console.log(arr)
    }
    return arr
}

// console.log(SelectionSort([1, 7, 9, 2, 3]))
// console.log(SelectionSort([4, 3, 6, 2, 5, 8, 9, 10, 5, 7]))
// console.log(SelectionSort([4, 3, 6, 2, 5, 8, 9, 10, 5, 7, 1]))

/**
 * 1. Two Sum
 *  Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

    Input: nums = [3,2,4], target = 6
    Output: [1,2]
 */

function twoSumHandler(nums, target) {
    let result = []
    let len = nums.length
    for (let i = 0; i < len; i++) {
        // console.log("cur: ", nums[i])
        for (j = i+1; j < len; j++) {
            // console.log(nums[i], "、", nums[j])
            if (nums[i] + nums[j] === target) {
                result.push([i, j])
            }
        }
    }
    return result
}

// console.log(twoSumHandler([2, 7, 11, 15, 3, 2, 15], 18))
// console.log(twoSumHandler([3, 2, 4], 6))



/** TODO:
 *  2. Maximum Subarray （最大子数组）
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.
 * 给定一个整数数组 nums，找到 子数组 具有最大的总和，并返回它的总和。
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 * 
 * Input: nums = [1]
 * Output: 1
 * Explanation: The subarray [1] has the largest sum 1.
 * 
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 * 
 */

function Maximum(nums) {
    let start = 0
    let end = 0
    let max = 0
    let cur = nums[0]
    max = nums[0]

    if (nums.length === 1) {
        start = 0
        end = 0
        max = nums[0]
    }

    for (let i=0;i<nums.length;i++) {
        cur = nums[i]
        for (let j = i+1; j< nums.length; j++) {
            cur += nums[j]
            if (cur > max) {
                max = cur
                start = i
                end = j
            }
        }
    }
    console.log(max, start, end);
}

Maximum([-2,1,-3,4,-1,2,1,-5,4])
Maximum([5,4,-1,7,8])
Maximum([1])






/** TODO:
 * 3. Move Zeroes (移除0)
 * Input: nums = [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 */

/** TODO:
 * Contains Duplicate （是否包含重复项）
 * Input: nums = [1,2,3,1]
 * Output: true
 * 
 * Input: nums = [1,2,3,4]
 * Output: false
 * 
 */


/** TODO:
 * 4. Rotate Array
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 * 
    Input: nums = [1,2,3,4,5,6,7], k = 3
    Output: [5,6,7,1,2,3,4]
    Explanation:
    rotate 1 steps to the right: [7,1,2,3,4,5,6]
    rotate 2 steps to the right: [6,7,1,2,3,4,5]
    rotate 3 steps to the right: [5,6,7,1,2,3,4]

    Input: nums = [-1,-100,3,99], k = 2
    Output: [3,99,-1,-100]
    Explanation: 
    rotate 1 steps to the right: [99,-1,-100,3]
    rotate 2 steps to the right: [3,99,-1,-100]
 */


/** TODO:
 * 5. Longest Word
 * 
 * Input: "fun&!! time"
 * Output: time
 * 
 * Input: "I love dogs"
 * Output: love
 */

