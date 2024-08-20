import { Router } from 'express'
import CartManager from '../services/CartManager.js';

const router = Router();
const cartManager = new CartManager();



router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)

        if (Number.isInteger(cartId) && cartId > 0) {
            const cart = await cartManager.getCartById(cartId)

            if (cart) {
                res.json(cart)
            } else {
                res.status(404).json({ error: 'No se encontró el carrito' });
            }

        } else {
            res.status(400).json({ error: 'El id del carrito debe ser numérico y mayor que 0' });
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
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid);

        if (Number.isInteger(cartId) && cartId > 0 && Number.isInteger(productId) && productId > 0) {
            const cart = await cartManager.addProduct(cartId, productId)

            if (cart) {
                res.json(cart)
            } else {
                res.status(404).json({ error: 'No se encontró el carrito' });
            }

        } else {
            res.status(400).json({ error: 'El id del carrito y el producto deben ser numéricos y mayor que 0' });
        }
    } catch (error) {
        console.log(error);
    }
   
})



export default router;

