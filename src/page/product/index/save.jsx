// save products info
import React 			from 'react';
import PageTitle 		from 'component/page-title/index.jsx';
import MUtil        	from 'util/mm.jsx'
import Product         	from 'service/product-service.jsx'
import CategorySelector from './category-selector.jsx';
import FileUploader 	from 'util/file-uploader/index.jsx';
import RichEditor 		from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm   = new MUtil();
const _product = new Product();


class ProductSave extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id       			: this.props.match.params.pid,
			name 				: '',
			subtitle 			: '',
			categoryId 			: 0,
			parentCategoryId 	: 0,
			subImages 			: [],
			price 				: '',
			stock 				: '',
			detail 				: '',
			status 				: 1 // 1 : on sale
		}
	}

	componentDidMount(){
		this.loadProduct();
	}

	// load product details
	loadProduct(){
		// id is valid, can edit the product
		if(this.state.id){
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }

	}
	// field change, eg: name, description, price, stock
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value.trim();
			this.setState({
				[name] : value
			});
	}

	onCategoryChange(categoryId, parentCategoryId){		
		this.setState({
			categoryId : categoryId,
			parentCategoryId : parentCategoryId
		});

	}

	// upload picture successfully / error
	onUploadError(errMsg){
		_mm.errorTips(errMsg);
	}

	onUploadSuccess(res){
		let subImages = this.state.subImages;
		subImages.push(res);
				this.setState({
			subImages  : subImages
		});

	}

	onImageDelete(e){
		let index 		= parseInt(e.target.getAttribute('index')),
			subImages 	= this.state.subImages;

		subImages.splice(index, 1);
		this.setState({
			subImages : subImages
		});
	}

	// change on rich-text editor
	onDetailValueChange(value){
		this.setState({
			detail: value
		});

	}
	getSubImagesString(){
		return this.state.subImages.map((image) => image.uri).join(',');
	}

	onSubmit(){
		let product = {
			name 		: this.state.name,
			subtitle 	: this.state.subtitle,
			categoryId 	: parseInt(this.state.categoryId),
			subImages 	: this.getSubImagesString(),
			detail 		: this.state.detail,
			price 		: parseFloat(this.state.price),
			stock 		: parseInt(this.state.stock),
			status 		: this.state.status,
		},
		productCheckResult  = _product.checkProduct(product);
		if(this.state.id){
			product.id = this.state.id;
		}
		
		if(productCheckResult.status){  // form comfirmation successfully
			_product.saveProduct(product).then((res) => {
				_mm.successTips(res);
				this.props.history.push('/product/index');
			}, (errMsg) => {
				_mm.errorTips(errMsg);
			});

		} else { // fail to confirm
			_mm.errorTips(productCheckResult.msg);

		}
	}
 

	render() {
		return (
			<div id="page-wrapper" >
				<PageTitle title={this.state.id ? 'Edit product' : 'Add product'} />
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-md-2 control-label">Product Name</label>
						<div className="col-md-5">
							<input 	type="text" 
									className="form-control" 
									placeholder="please input product Name" 
									name="name"
									value={this.state.name}
									onChange={(e) => this.onValueChange(e)}/>
						</div>
					</div>
				<div className="form-group">
					<label  className="col-md-2 control-label">Description</label>
					<div className="col-md-5">
						<input 	type="text" 
								className="form-control" 
								placeholder="please input product description" 
								name="subtitle"
								value={this.state.subtitle}
								onChange={(e) => this.onValueChange(e)}/>
					</div>
				</div>

				<div className="form-group">
					<label  className="col-md-2 control-label">Category</label>
					<CategorySelector 
							categoryId={this.state.categoryId}
							parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>

				</div>

				<div className="form-group">
					<label  className="col-md-2 control-label">Product price</label>
					<div className="col-md-3">
						<div className="input-group">
							<input  type="number" 
									className="form-control" 
									placeholder="please input product price" 
									name="price"
									value={this.state.price}
									onChange={(e) => this.onValueChange(e)}/>
							<span className="input-group-addon">USD</span>
						</div>
					</div>
				</div>

				<div className="form-group">
					<label  className="col-md-2 control-label">Stock</label>
					<div className="col-sm-3">
					<div className="input-group">
						<input 	type="number" 
								className="form-control" 
								placeholder="stock" 
								name="stock"
								value={this.state.stock}
								onChange={(e) => this.onValueChange(e)} />
						<span className="input-group-addon" >piece</span>
					</div>
					</div>
				</div>

				<div className="form-group">
					<label  className="col-md-2 control-label">Product picture</label>
					<div className="col-md-10">
						{
							this.state.subImages.length ? this.state.subImages.map(
									(image, index) => (
										<div className="img-con" key={index}>
											<img className="img" src={image.url} />
											<i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
										</div>)

								) : <div>
									please upload picture
								</div>
						}
					</div>

					<div className="col-md-offset-2 col-md-10 file-upload-con">
						<FileUploader 	onSuccess={(res) => this.onUploadSuccess(res)}
                                		onError={(errMsg) => this.onUploadError(errMsg)}/>
					</div>
				</div>

				<div className="form-group">
					<label  className="col-sm-2 control-label">Product details</label>
					<div className="col-md-10">
					  <RichEditor  
					  			detail={this.state.detail}
					  			defaultDetail={this.state.defaultDetail}
					  			onValueChange={(value) => this.onDetailValueChange(value)}/>
					</div>
				</div>
				
				<div className="form-group">
					<div className="col-md-offset-2 col-md-10">
						<button type="submit" className="btn btn-primary" onClick={(e) => {
							this.onSubmit(e)}}>Submit</button>
					</div>
				</div>
				</div>
		</div>
		)
	}
}
export default ProductSave;