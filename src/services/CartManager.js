import ProductManager from '../services/ProductManager.js';
import cartModel from '../models/carts.model.js';






export default class CartManager {


    async getCartById(id) {
        try {
            return await cartModel.findById(id).lean().populate("products.product")
        } catch (error) {
            return null
        }
    }



    async createCart() {
        const newCart = {
            products: []
        }

        try {
            const cart = await cartModel.create(newCart);

            return cart._id
        }
        catch (error) {
            console.log(error)

        }
    }

    async addProduct(idCart, idProduct) {

        try {
            const cart = await cartModel.findById(idCart)

            if (cart) {
                const productManager = new ProductManager()
                const validProduct = await productManager.getProductById(idProduct)

                if (validProduct) {

                    const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

                    console.log(existingProduct);
                    if (existingProduct === -1) {
                        cart.products.push({ product: idProduct, quantity: 1 })

                    } else {
                        cart.products[existingProduct].quantity += 1;
                    }

                    const cartUpdated = await cartModel.findByIdAndUpdate(idCart, { $set: { products: cart.products } });
                    return cartUpdated

                }
                return -1
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }


    async updateAllProducts(idCart, products) {

        try {
            const cart = await cartModel.findById(idCart)

            if (cart) {
               

                    const cartUpdated = await cartModel.findByIdAndUpdate(idCart, { $set: { products: products } });
                    return cartUpdated

               
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }


    async updateQuantityProduct(idCart, idProduct, quantity) {

        try {
            const cart = await cartModel.findById(idCart)

            if (cart) {
                const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

                if (existingProduct != -1) {

                    cart.products[existingProduct].quantity =  quantity;

                    const cartUpdated = await cartModel.findByIdAndUpdate(idCart, { $set: { products: cart.products } });
                    return cartUpdated

                }
                return -1
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }

    async deleteAllProducts(idCart) {

        try {
            const cart = await cartModel.findByIdAndUpdate(idCart, { $set: { products: [] } });

                return true
            
        } catch (error) {
            console.log(error);
        }


    }

    async deleteProduct(idCart, idProduct) {

        try {
            const cart = await cartModel.findById(idCart)

            if (cart) {
                const productManager = new ProductManager()
             
              const existingProduct = cart.products.findIndex((element) => element.product == idProduct);

              
                if (existingProduct === -1) {
                    return existingProduct

                }  
                cart.products.splice(existingProduct,1)
                    

                const cartUpdated = await cartModel.findByIdAndUpdate(idCart, { $set: { products: cart.products } });
                return cartUpdated

                
              
            }
            return null
        } catch (error) {
            console.log(error);
        }


    }






}