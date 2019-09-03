mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.then((db) => {
    console.log('db connected');
    return db;
}).catch((err) => {
    console.log('error');
});