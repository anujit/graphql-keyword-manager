module.exports = {
    Query: {
        keywords: async (_, {pageSize = 10, category}, {dataSources}) => {
            const keywordsByCategory = await dataSources.keywordsApi.getKeywords({category, pageSize});
            return keywordsByCategory;
        }
    },
    Mutation: {
        deleteKeyword: async (_, {keyword}, {dataSources}) => {
            const result = await dataSources.keywordsApi.deleteKeyword(keyword);
            return !result ? true : false;
        }
    }
}