module.exports = {
    Query: {
        categories: (root, args, context) => ([{
            id: '1234',
            name: 'Cat1',
            ko: 'ERR'
        }]),
        keywords: (root, args, context) => {
            return [{
                word: 'Celerio',
                id: '12345',
                score: 12345
            }]
        }
    }
}