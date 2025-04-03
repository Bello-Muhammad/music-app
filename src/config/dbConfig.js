const mongoose = require('mongoose');
const { MONGO_URL } = require('./envConfig');

// mongoose setup
mongoose.connect(MONGO_URL, 
).then(() => {
    console.log("mongodb connected");
});