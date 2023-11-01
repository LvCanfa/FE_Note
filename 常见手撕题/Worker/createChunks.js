export function createChunks(file, index, chunkSize) {
    return new Promise((resolve, reject) => {
        const start = index * chunkSize;
        const end = start + chunkSize;
        const fileReader = new FileReader();
        // spark.append(e.target.result);
        const files = file.slice(start,end);
        fileReader.readAsArrayBuffer(file.slice(start,end))
        fileReader.onload = e=>{
            console.log(e);
            const md5res = 'md5res'
            resolve({
                start,
                end,
                index,
                hash:md5res,
                files,
                res:'res'
            })
        }
    })
}