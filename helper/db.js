const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://fatih47154:Fatih4715434_@ds155294.mlab.com:55294/heroku_rv295r8q', { useNewUrlParser: true});
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connection.on('open', () => {
        // console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};