import { Router } from 'express'
import ProductManager from '../services/ProductManager.js'

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {

    try {

        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getAllProducts(limit)
        res.json(products)

    } catch (error) {
        console.log(error);
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)

        if (Number.isInteger(productId) && productId > 0) {
            const product = await productManager.getProductById(productId)

            if (product) {
                res.json(product)
            } else {
                res.status(404).json({ error: 'No se encontró el producto' });
            }

        } else {
            res.status(400).json({ error: 'El id del producto debe ser numérico y mayor que 0' });
        }
    } catch (error) {
        console.log(error);
    }
})


router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        const newProduct = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails })
        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error);
    }
})


router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (Number.isInteger(productId) && productId > 0) {
            const updateProduct = await productManager.updateProduct(productId, req.body);

            if (updateProduct) {
                res.json(updateProduct)
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }

        } else {
            res.status(400).json({ error: 'El id del producto debe ser numérico y mayor que 0' });
        }


    } catch (error) {
        console.log(error);
    }
})


router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        if (Number.isInteger(productId) && productId > 0) {
            const deletedProduct = await productManager.deleteProduct(productId)
            
            if (deletedProduct) {
                res.json(deletedProduct)
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }

        } else {
            res.status(400).json({ error: 'El id del producto debe ser numérico y mayor que 0' });
        }


    } catch (error) {
        console.log(error);
    }
})



export default router;