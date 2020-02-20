const CategoryDataSource = require('./datasources/category');

module.exports = {
    Query: {
        categories : async (_, args, {prisma}) => {
            return await prisma.categories();
        }
    },
    Mutation: {
        createCategory: async (_, {pageSize = 10, name}, {prisma}) => {
            const keywords = await CategoryDataSource.fetchKeywords(_, {name, pageSize});
            const category = await prisma.createCategory({
                name,
                keywords: {
                  create: keywords.map(keyword => {
                    const {word, score} = keyword;
                    return {
                      word,
                      score
                    }
                  })
                }
              });
              console.log('category', category);
              return category;
        },
        createKeyword: async (_, {name, categoryId, score = 10000}, {prisma}) => {
            return await prisma.createKeyword({
                word: name,
                score,
                category: {
                    connect: {id: categoryId}
                }
            });
        },
        deleteCategory: async (_, {categoryId}, {prisma}) => {
            return await prisma.deleteCategory({
                id: categoryId
            });
        },
        deleteKeyword: async (_, {keywordId}, {prisma}) => {
            return await prisma.deleteKeyword({
                id: keywordId
            });
        }
    },
    Category: {
        keywords (root, args, context) {
            return context.prisma
            .category({
                id: root.id,
            })
            .keywords()
      },
    },
    Keyword: {
      category(root, args, context) {
        return context.prisma
          .post({
            id: root.id,
          })
          .category()
      }
    }    
}