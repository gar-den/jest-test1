const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/jest1'

const connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("mongodb is working"))
    .catch(console.log);
}

module.exports = connect;