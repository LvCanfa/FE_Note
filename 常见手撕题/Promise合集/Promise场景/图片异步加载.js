function loadImg(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject('err:',url)
        }
        img.src = url;
    })
}
loadImg('path')
    .then((res)=>{
        oldBox .style.display = 'none';
        newBox.appendChild(res);
    })