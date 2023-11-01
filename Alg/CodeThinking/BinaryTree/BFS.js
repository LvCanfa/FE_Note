const root = {
    val: 1,
    left: {
        val: 2,
        left: { val: 4 },
        right: { val: 5 }
    },
    right: {
        val: 3,
        left: { val: 6 },
        right: { val: 7 }
    }
}
function myBFS(root) {
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const res = []
        const quequeLen = queue.length
        for (let i = 0; i < quequeLen; i++) {
            const rootNow = queue.shift();
            console.log(rootNow);
            res.push(rootNow.val);
            if (rootNow.left) {
                queue.push(rootNow.left)
            }
            if (rootNow.right) {
                queue.push(rootNow.right)
            }
        }
        result.push(res);
    }
    console.log(result);
}
myBFS(root)