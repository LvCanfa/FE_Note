import { createChunks } from "./createChunks.js";

onmessage = async (e) => {
    console.log(e.data);
    const arr = [];
    const { file,
        CHUNK_SIZE,
        startIndex,
        endIndex } = e.data;

    for (let i = startIndex; i < endIndex; i++) {
        arr.push(createChunks(file, i, CHUNK_SIZE));
    }
    const chunks = await Promise.all(arr);
    postMessage(chunks);
    // console.log(chunks,'chunks');
}