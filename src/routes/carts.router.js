import { Router } from 'express'
import CartManager from '../services/CartManager.js';



const router = Router();
const cartManager = new CartManager();


router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid

        const cart = await cartManager.getCartById(cartId)

        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: 'No se encontró el carrito' });
        }
    } catch (error) {
        console.log(error);
    }
})


router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()

        if (cart) {
            res.json({ status: `Carrito con id: ${cart} correctamente creado` })
        } else {
            res.status(404).json({ error: 'No se logró crear el carrito' });
        }

    } catch (error) {
        console.log(error);
    }
})


router.post('/:cid/product/:pid', async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

       
        const cart = await cartManager.addProduct(cartId, productId);
        if(cart===-1){
            return res.status(400).json({ error: 'El pruducto ingresado no existe' });
        }
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
   
})




/* El body recibe un arreglo con el siguiente formato
         [
             {
             "product": "66e4b04191008e5d236762ea",
             "quantity": 1
             },
             {
              "product": "66e4b04191008e5d236762ce",
              "quantity": 1
             }
        ]
*/


router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const products = req.body

       
        const cart = await cartManager.updateAllProducts(cartId, products);
        
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
})


//en el body se recibe exclusivamente el número que indica para actualizar la cantidad del  prducto indicado
router.put('/:cid/product/:pid', async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        console.log(req.body.quantity)
        const quantity = req.body.quantity?parseInt(req.body.quantity):0;

        if(quantity<=0){
            return res.status(400).json({ error: 'La cantidad del producto debe ser un número mayor que 0' });
        }
       
        const cart = await cartManager.updateQuantityProduct(cartId, productId,quantity);
        if(cart===-1){
            return res.status(400).json({ error: 'El pruducto ingresado no existe' });
        }
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
   
})


router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid

        const cart = await cartManager.deleteAllProducts(cartId);
        
        if (cart) {
            return res.json("Todos los productos del carrito fueron eliminados")
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
})



router.delete('/:cid/product/:pid', async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

       
        const cart = await cartManager.deleteProduct(cartId, productId);
        if(cart===-1){
            return res.status(400).json({ error: 'El pruducto ingresado no existe en el carrito' });
        }
        if (cart) {
            return res.json(cart)
         } 
        res.status(404).json({ error: 'No se encontró el carrito' });
        

    } catch (error) {
        console.log(error);
    }
   
})


export default router;

