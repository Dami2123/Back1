import express from 'express'
import {engine} from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public/'))

// Routers
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewRouter)



app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});