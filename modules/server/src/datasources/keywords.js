const {RESTDataSource} = require('apollo-datasource-rest');

class KeywordsAPI extends RESTDataSource {
    constructor({store}) {
        super();
        this.baseURL = 'https://api.datamuse.com/';
        this.store = store;

    }

    transformKeywords(keywords, category) {
        keywords.forEach(keyword => {
            keyword.category = category;
        });
        return keywords;
    }

    async fetchKeywords ({category, pageSize}) {
        const response = await this.get('words', {
            ml: category,
            max: pageSize
        });
        console.log('rest response', response);
        // store in db the transformed response
        const transformedKeywords = this.transformKeywords(response, category);
        transformedKeywords.forEach(async (transformedKeyword) => {
            console.log(transformedKeyword);            
            this.store.keywords.create(transformedKeyword);
        });
        return transformedKeywords;
    }

    async getKeywords({category, pageSize}) {
        try {
            const keywords = await this.store.keywords.findAll({
                where: {category}
            });
            console.log("Keywords with category", category, JSON.stringify(keywords, null, 4));
            if (keywords.length > 0) {
                console.log('existing keywords');
                return keywords
            }
            return this.fetchKeywords({category, pageSize});
        } catch(e) {
            return this.fetchKeywords({category, pageSize});            
        }
    }

    async deleteKeyword(keyword) {
        /**
         * check if the keyword exists in the table.
         * if yes, delete that keyword
         */
        const res = await this.store.keywords.destroy({
            where: {
                word: keyword
            }
        });
    }
}

module.exports = KeywordsAPI;
