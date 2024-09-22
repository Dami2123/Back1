import express from 'express'
import ProductManager from '../services/ProductManager.js'
import CartManager from '../services/CartManager.js';
import cartModel from '../models/carts.model.js';

const router = express.Router()
const productManager = new ProductManager();
const cartManager= new CartManager();

router.get("/home", async (req, res) => {

   try {
       
        const allProducts = await productManager.getAllProducts(req.query)
        res.render("home", {
            title: "HOME",
            style: "style.css",
            response: allProducts     
        })

    } catch (error) {
        console.log(error);
    }
    
})

router.get("/realtimeproducts", async (req, res) => {

    
    try {
         res.render("realtimeproducts", {
             title: "Realtime Products",
             style: "style.css"
         })
 
     } catch (error) {
         console.log(error);
     }
     
 })

 router.get("/product/:pid", async (req, res) => {

    try {
        
         const product= await productManager.getProductById(req.params.pid)
         console.log(product);
         res.render("item", {
             title: "Product",
             style: "style.css",
             response: product  
         })
 
     } catch (error) {
         console.log(error);
     }
     
 })


 router.get('/cart/:cid', async (req, res) => {
    const allProducts = await cartManager.getCartById(req.params.cid);
    
    try {
         res.render("cart", {
             title: "Carrito",
             style: "style.css",
             cart: allProducts
         })
 
     } catch (error) {
         console.log(error);
     }
     
 })




export default router