export const cutFile = async (file) => {
    const CHUNK_SIZE = 10  * 2;
    const THREAD_COUNT = navigator.hardwareConcurrency || 4;
    console.log(THREAD_COUNT,'THREAD_COUNT');
    return new Promise((resolve, reject) => {
        let result = [];
        // 分片数量
        const chunks = Math.ceil(file.size / CHUNK_SIZE);
        // 每一个线程的处理片数
        const workerChunkCount = Math.ceil(chunks / THREAD_COUNT);

        let finishCount = 0;
        for (let i = 0; i < THREAD_COUNT; i++) {
            const worker = new Worker("./work_file.js", {
                type: "module",
            });
            const startIndex = i * workerChunkCount;
            let endIndex = startIndex + workerChunkCount;
            if (endIndex > chunks) {
                endIndex = chunks
            }
            let data = {
                file,
                CHUNK_SIZE,
                startIndex,
                endIndex
            }
            worker.postMessage(JSON.parse(JSON.stringify(data)))
            worker.onmessage = (e) => {
                for (let i = startIndex; i < endIndex; i++) {
                    result[i] = e.data[i - startIndex];
                }
                worker.terminate();
                finishCount++;
                if(finishCount === THREAD_COUNT) {
                    resolve(result);
                }
            }
        }
    })
}