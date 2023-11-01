new Promise((res)=>{
    console.log(1);
    res(2);
})
.then((res)=>{
    console.log(res);
    return 3
})
.then((res)=>{
    console.log(res);
    return 4
})
.then((res)=>{
    console.log(res);
    return 3
})
