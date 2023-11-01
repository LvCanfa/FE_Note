/**
 * @desc 策略模式可以用于处理复杂的 if-else 代码，新的策略方法无需改变已有代码!
 *       在 js 中可以构建一个存储策略函数的对象，根据入参决定使用哪一个策略函数
 *       新增方法仅需定义后增添入 strategyMap 即可
 * @param {*} place 
 */
function transferStyle(place) {
    /**
     * @description 处理字段显示和隐藏
     */
    const showOnLeft = () => { console.log('showOnLeft') }
    const showOnRight = () => { console.log('showOnRight') }
    const showOnMiddle = () => { console.log('showOnMiddle') }
    const showOnTop = () => { console.log('showOnTop') }
    const showOnBottom = () => { console.log('showOnBottom') }

    // 联动策略
    const strategyMap = {
        // 显示、隐藏
        [OP_STYLE.LEFT]: showOnLeft,
        [OP_STYLE.RIGHT]: showOnRight,
        [OP_STYLE.MIDDLE]: showOnMiddle,
        [OP_STYLE.TOP]: showOnTop,
        [OP_STYLE.BOTTOM]: showOnBottom,
    }
    strategyMap[place]();
}
const OP_STYLE = {
    LEFT: 'left',
    RIGHT: 'right',
    MIDDLE: 'middle',
    TOP: 'top',
    BOTTOM: 'bottom'
}
transferStyle('left');