import productModel from '../models/product.model.js'

export default class ProductManager {
  
   async getAllProducts({limit, page, category, stock, sort}) {
        const filter = {};
        const config = {lean: true};
        const result={}

        if(category)filter.category=category;
        if(stock&&stock==="true")filter.stock={$gt:0};
        if(stock&&stock==="false")filter.stock={$eq:0};
        config.limit= !limit||parseInt(limit)<=0 ? 10 : parseInt(limit);
        config.page = !page||parseInt(page)<=0  ? 1 : parseInt(page);
        if(sort==="desc")config.sort={ price: -1 };
        if(sort==="asc")config.sort={ price: 1 };
   
        try {
            const response = await productModel.paginate(filter, config)
      

            result.status= "Success"
            result.payload= response.docs
            result.totalPages= response.totalPages
            result.prevPage= response.prevPage
            result.nextPage= response.nextPage
            result.page=response.page
            result.hasPrevPage=response.hasPrevPage
            result.hasNextPage=response.hasNextPage

            if (response.hasPrevPage){
                let prevUrl= `?page=${response.prevPage}`
                if(config.limit!=10) prevUrl += `&limit=${config.limit}`;
                if(filter.category) prevUrl +=`&category=${category}`;
                if(filter.stock) prevUrl +=`&stock=${stock}`;
                if(config.sort) prevUrl += `&sort=${sort}`;
                result.prevLink=prevUrl
            }else{
                result.prevLink=null
            }
           

            if (response.hasNextPage ){
                let nextUrl= `?page=${response.nextPage}`
                if(config.limit!=10) nextUrl += `&limit=${config.limit}`;
                if(filter.category) nextUrl +=`&category=${category}`;
                if(filter.stock) nextUrl +=`&stock=${stock}`;
                if(config.sort) nextUrl += `&sort=${sort}`;
                result.nextLink=nextUrl
            }else{
                result.nextLink=null
            }
      
            return result

        } catch (error) {
            console.error(error)
        }
}

    async getProductById(id) {
    
        try {
            return await productModel.findById(id).lean();
        } catch (error) {
            return null
        }
        
    }

   async addProduct(product) {
    try {
        await productModel.create(product);
        return await productModel.findOne({ code: product.code })
    }
    catch (error) {
        console.log(error.message)
        return error.code
    }
     
    }

    async updateProduct(id, updatedFields) {

        try {
            const productUpdated= await productModel.findByIdAndUpdate(id, { $set: updatedFields });
            return await productModel.findOne({ _id: productUpdated._id})
        } catch (error) {
            if(error.name&&error.name==="CastError"){
                return null
            }
            return error.code
        }
        

    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            return  null
        }
    }
}