import fetchApi  from "./fetchApi";
window.fetch = fetchApi.fetch
fetchApi.get('http://www.xxx', {id: '1'})

fetchApi.post('http://www.xxx', {id: '1'})