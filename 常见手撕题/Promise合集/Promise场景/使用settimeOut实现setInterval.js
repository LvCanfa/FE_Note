function myInterval(fn,timeout){
    let timer = null;
    function fun(){
        return setTimeout(() => {
            fn();
            timer = fun();
        }, timeout);
    }
    timer = fun();
    return ()=>{ clearTimeout(timer)}
}
const clear = myInterval(()=>{console.log(1);},1000);
setTimeout(() => {
    clear()
}, 2050);