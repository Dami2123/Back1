import { Router } from 'express'
import ProductManager from '../services/ProductManager.js'

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {

    try {
        
        const products = await productManager.getAllProducts(req.query)
        if(products.hasPrevPage)products.prevLink=`http://localhost:8080/api/products`+products.prevLink;
        if(products.hasNextPage)products.nextLink=`http://localhost:8080/api/products`+products.nextLink;

        res.json(products)

    } catch (error) {
        console.log(error);
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid

        const product = await productManager.getProductById(productId)
        console.log(product);
        if (product) {
                res.json(product)
        } else {
                res.status(404).json({ error: 'No se encontró el producto' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error", error: error});
    }
})


router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        const newProduct = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails })
        if (newProduct===11000) {
            return res.status(400).json({ error: `Ya existe un producto con code: ${code}` });
        }
        res.status(201).json({ response:"Success", createdProduct:newProduct})
    } catch (error) {
        console.log(error);
    }
})


router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
    
        const updateProduct = await productManager.updateProduct(productId, req.body);
        if (!updateProduct) {
           return res.status(404).json({ error: 'Producto no encontrado' });
        } 
     
        if (updateProduct===11000) {
            return res.status(400).json({ error: `El código ingresado ya existe para un producto distinto al del id ingresado`  });
         } 
         res.status(201).json({ response:"Success", updatedProduct:updateProduct})
       

    } catch (error) {
        console.log(error);
    }
})


router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid

        const deletedProduct = await productManager.deleteProduct(productId)
        if (deletedProduct) {
            res.json({ response:"Success", productDeleted:deletedProduct})
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }

    } catch (error) {
        console.log(error);
    }
})



export default router;