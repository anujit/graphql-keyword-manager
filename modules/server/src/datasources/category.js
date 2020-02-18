const {RESTDataSource} = require('apollo-datasource-rest');

class CategoryApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.datamuse.com/';
    }
    
    async getCategory ({categoryName, pageSize}) {   
        const response = await this.get('words', {
            ml: categoryName,
            max: pageSize
        });
        return response;
    }

    async deleteCategory (categoryName) {
        return {
            success: true,
            name: categoryName
        }
    }
}

module.exports = CategoryApi;