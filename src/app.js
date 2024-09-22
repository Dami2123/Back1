import express from 'express'
import { engine } from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { Server } from 'socket.io'
import ProductManager from './services/ProductManager.js'
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;
const productManager = new ProductManager();

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


const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});

const URI= "mongodb+srv://user:admin@proyecto.10xow.mongodb.net/eCommerce?retryWrites=true&w=majority"


const connectMongoDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};
connectMongoDB()

const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {

    const allProducts = await productManager.getAllProducts()
    socket.emit("allProducts", allProducts)

    socket.on("newProduct", async data => {

        const { title, description, code, price, stock, category, thumbnails } = data;
        const product = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails })

        socket.emit("codeVerification", product)

    });


})