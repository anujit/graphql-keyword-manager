module.exports = {
    Query: {
        keywords: async (_, {pageSize = 10, category}, {dataSources}) => {
            const keywordsByCategory = await dataSources.keywordsApi.getKeywords({category, pageSize});
            return keywordsByCategory;
        },
        category: async (_, {pageSize = 10, categoryName}, {dataSources}) => {
            const keywords = await dataSources.categoryApi.getCategory({
                categoryName,
                pageSize
            })
            return {name: categoryName, keywords};
        }
    },
    Mutation: {
        deleteKeyword: async (_, {keyword}, {dataSources}) => {
            const result = await dataSources.keywordsApi.deleteKeyword(keyword);
            return !result ? true : false;
        },
        deleteCategory: async (_, {x}, {dataSources}) => {
            const result = await dataSources.categoryApi.deleteCategory(x);
            return result;
        }        
    }
}