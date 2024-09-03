import express from 'express'
import ProductManager from '../services/ProductManager.js'

const router = express.Router()
const productManager = new ProductManager();


router.get("/home", async (req, res) => {

   try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const allProducts = await productManager.getAllProducts(limit)
        res.render("home", {
            title: "HOME",
            style: "style.css",
            products: allProducts     
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




export default router