import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection="products"

const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        index:true
    },
    stock: {
        type: Number,
        required: true,
        index:true
    },
    thumbnail: { type: Array },
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,
        index:true
    },
    status: {
        type: Boolean,
        default: true
    }    
}
)

productSchema.plugin(mongoosePaginate)

const productModel= mongoose.model(productCollection,productSchema)
export  default productModel;