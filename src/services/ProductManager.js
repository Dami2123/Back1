import fs from 'fs/promises'
import path from 'path'

const productosFilePath = path.resolve('data', 'productos.json')

export default class ProductManager {
    constructor() {
        this.products = []
    }

    async init() {
        try {
            const data = await fs.readFile(productosFilePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products = []
        }
    }

   

    saveToFile() {
        fs.writeFile(productosFilePath, JSON.stringify(this.products, null, 2));
    }

   async getAllProducts(limit) {
        await this.init();

        if (limit) {
            return this.products.slice(0, limit)
        }
        return this.products
    }

    verificationProductCode(code){
        const productIndex = this.products.findIndex(product => product.code === code);
        if (productIndex === -1) {
            return null
        }else{
            return this.products[productIndex].id
        }
        

    }

   async productVerificationById(id){
       await this.init();
       console.log(this.products.length)
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return true
        }else{
            return null
        }
    }


    async getProductById(id) {
        await this.init();

        return this.products.find(product => product.id === id)
    }

   async addProduct(product) {
        await this.init();

        if (this.verificationProductCode(product.code)) return false;

        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true
        };
        this.products.push(newProduct)
        this.saveToFile()
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        await this.init();

        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) return null;

        const idExistingCode= updatedFields.code? this.verificationProductCode(updatedFields.code):null
        if (idExistingCode != id && idExistingCode) return 1;
        
        
        const updateProduct = {
            ...this.products[productIndex],
            ...updatedFields,
            id: this.products[productIndex].id 
        }
        this.products[productIndex] = updateProduct;
        this.saveToFile();
        return updateProduct;
    }

    async deleteProduct(id) {
        await this.init();

        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) return null;

        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveToFile()
        return deletedProduct[0];
    }
}