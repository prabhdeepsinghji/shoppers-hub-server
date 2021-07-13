const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json()) //acts as middleware to specify the type of data recieved
app.use(morgan('tiny')) //acts as middleware to get logs for api requests
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)
//Routes
const categoriesRoutes = require('./routers/categories')
const productsRoutes = require('./routers/products')
const usersRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'shop-database'
})
.then(()=>{
    console.log('Database connection is ready...')
})
.catch((err)=>{
    console.log(err)
})

// //Server
// app.listen(3000, ()=>{
//     console.log('server is live http://localhost:3000')
// })

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port)
})