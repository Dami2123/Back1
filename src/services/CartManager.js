import fs from 'fs/promises'
import path from 'path'

const cartsFilePath = path.resolve('data', 'carts.json')

export default class CartManager {
    constructor() {
        this.carts = []
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8')
            this.carts = JSON.parse(data)
        } catch (error) {
            this.carts = []
        }
    }

   

    saveToFile() {
        fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }


    getCartById(id) {
        const cart= this.carts.find(cart => cart.id === id)
        return cart.products
    }



    createCart() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []
        };
        this.carts.push(newCart)
        this.saveToFile()
        return newCart.id;
    }

    addProduct(idCart, idProduct) {
        const cartIndex = this.carts.findIndex(cart => cart.id === idCart)
        if (cartIndex === -1) return null;
        

        const existingProduct = this.carts[cartIndex].products.find((element) => element.product === idProduct);

        if (!existingProduct) {

            this.carts[cartIndex].products.push( {product: idProduct, quantity:1})

        } else {

            existingProduct.quantity = existingProduct.quantity + 1;

        }

        this.saveToFile();
        return this.carts[cartIndex];
    }



}