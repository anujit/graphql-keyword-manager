const {Sequelize} = require('sequelize');

module.exports.createStore = () => {
    const db = new Sequelize('db1',null,null,{
        dialect: 'sqlite',
        storage: './store.sqlite'
    });

    const keywords = db.define('keyword', {
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,        
        word: Sequelize.STRING,
        category: Sequelize.STRING,
        score: Sequelize.STRING
    });

    return {db, keywords};
}