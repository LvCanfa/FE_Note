/**
 * 
重绘 ( Repaint) 和回流 ( Reflow)
重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

重绘是当节点需要更改外观而不会影响布局的， 比如改变 color 就叫称为重绘 回流是布局或者几何属性需要改变就称为回流。

 @diff 回流必定会发生重绘， 重绘不一定会引发回流 。

回流所需的成本比重绘高的多， 改变深层 次的节点很可能导致父节点的一系列回流。
所以以下几个动作可能会导致性能问题:
改变 window 大小 改变字体
添加或删除样式 文字改变
定位或者浮动
盒模型
 @important 很多人不知道的是，重绘和回流其实和 Event loop 有关。
当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新 。
 @timeout 因为浏览 器是 60Hz 的刷新率，每 16ms 才会更新一次。
          1. 判断是否有 resize 或者 scroll ，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次， 并且自带节流功能。 
          2. 判断是否触发了 media query
          3. 更新动画并且发送事件
          4. 判断是否有全屏操作事件
          5. 执行 requestAnimationFrame 回调
          6. 执行 IntersectionObserver 回调，该方法用于判断元素是否可见， 可以用于懒加载上， 但是兼容性不好 更新界面
        以上就是一帧中可能会做的事情 。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调。


减少重绘和回流

 */
// 使用 visibility 替换 display: none ， 因为前者只会引起重绘，后者会引发回流 ( 改变了布局)
/**
 * 
把 DOM 离线后修改， 比如:先把 DOM 给 display:none (有一次 Reflow )，然后你
修改 100 次，然后再把它显示出来
 */
// 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
for (let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流， 因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
/**
不要使用 table 布局， 可能很小的一个小改动会造成整个 table 的重新布局 动画实现 的速度的选择， 动画速度越快， 回流次数越多，也可以选择使用
requestAnimationFrame
CSS 选择符从右往左匹配查找， 避免 DOM 深度过深
将频繁运行的动画变为图层， 图层能够阻止该节点回流影响别的元素 。比如对于 video 标签， 浏览器会自动将该节点变为图层。

 * 
 */