const fetch = require('node-fetch');
const baseURL = 'https://api.datamuse.com/words?ml='


async function fetchKeywords(root, args) {
    const {name} = args;
    const response = await fetch(`${baseURL}${name}&max=10`);
    console.log(typeof response);
    let data = await response.json();
    return data;
}

module.exports = {
    fetchKeywords
}
