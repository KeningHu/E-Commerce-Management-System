import MUtil 	from 'util/mm.jsx';

const _mm = new MUtil();
class Product{

	getProductList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/manage/product/list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    getProduct(productId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId || 0
            }
        });

    }

	// modify the status of products
	setProductStatus(productInfo){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data    : productInfo
        });
    }
    // inspect: save form
    checkProduct(product){
        let result = {
            status : true,
            msg : 'varification confirmed'

        };
        // product name
        if(typeof product.name !== 'string' || product.name.length === 0){
            return {
                status: false,
                msg: 'product name can not be empty!'
            }
        }
        //product description
        if(typeof product.subtitle!== 'string' || product.subtitle.length === 0){
            return {
                status: false,
                msg: 'product description can not be empty!'
            }
        }

        // category Id
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: 'please choose category!'
            }
        }

        // price
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: 'please input valid price!'
            }
        }
        // stock
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: 'please input valid stock!'
            }
        }
        
        return result;
    }
    
    // save product
    saveProduct(product){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/save.do',
            data    : product
        });

    }

    /*
    * about  category
    */
    // get category list by using parent categoryId
    getCategoryList(parentCategoryId){
    	return _mm.request({
            type    : 'post',
            url     : '/manage/category/get_category.do',
            data    : {
            	categoryId:  parentCategoryId || 0
            }
        });
    }

    // add a new category
    saveCategory(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/add_category.do',
            data    : category
        });

    }
    // update category name
    updateCategoryName(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }

}

export default Product;