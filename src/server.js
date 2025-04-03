const express = require('express');
const AppRouter = require('./route');
require('./config/dbConfig')

const app = express();

//port declaration
const port = process.env.PORT || 3000;

//initializing express middleware
app.use(express.json());

//routers intialization
app.use('/api/v1', AppRouter);

//setup route for none existing route
app.get ('/', (req, res) => {
    res.send('system running fine')
});

//server listen on available port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)}
);