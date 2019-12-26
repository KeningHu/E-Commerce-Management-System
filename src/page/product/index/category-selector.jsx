import React 		from 'react';
import Product         	from 'service/product-service.jsx'
import MUtil        	from 'util/mm.jsx'

const _mm   = new MUtil();
const _product = new Product();

import './category-selector.scss';

class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstCategoryList : [],
			firstCategoryId   : 0,
			secondCategoryList: [],
			secondCategoryId  : 0
		}
	}

	componentDidMount(){
		this.loadFirstCategory();
	}

	componentWillReceiveProps(nextProps){
		 let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
		// data does not change
		if(!categoryIdChange && !parentCategoryIdChange){
			return;
		}

		// if only has one level category
		if(nextProps.parentCategoryId === 0){
			this.setState({
				firstCategoryId 	: nextProps.categoryId,
				secondCategoryId 	: 0
			});
		} // has two levels category
		 else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }



	}

	loadFirstCategory(){
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList: res
			});
		}, errMsg => {
			_mm.errorTips(errMsg);
		});

	}

	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res => {
			this.setState({
				secondCategoryList: res
			});
		}, errMsg => {
			_mm.errorTips(errMsg);
		});

	}
	
	

	// select first level category
	onFirstCategoryChange(e){
		if(this.props.readOnly){
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId 	: newValue,
			secondCategoryId 	: 0,
			secondCategoryList 	:[],
		}, () => {
			// update second level category
			this.loadSecondCategory();
			this.onPropsCategoryChange();
		});

	}
	// choose second level category
	onSecondCategoryChange(e){
		if(this.props.readOnly){
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId 	: newValue
		}, () => {
			// update 
			this.onPropsCategoryChange();
		});
		
	}

	// send result to parent component
	onPropsCategoryChange(){
		// determine if props has recall function	
		 let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }
        else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }


	}

	render() {
		return (
			<div className="col-sm-10">
				<select className="form-control cate-select" 
						onChange={(e) => this.onFirstCategoryChange(e)}
						readOnly={this.props.readOnly}>
					<option value="">choose first level category</option>
					{
						this.state.firstCategoryList.map((category, index) => <option value={category.id} key={index}>{category.name}</option>)
					}
				</select>
				{this.state.secondCategoryList.length ?
					(<select className="form-control cate-select"
						onChange={(e) => this.onSecondCategoryChange(e)}
						readOnly={this.props.readOnly}>
						<option value="">choose second level category</option>
						{
							this.state.secondCategoryList.map((category, index) => <option value={category.id} key={index}>{category.name}</option>)
						}
 
					</select> ) : null
			}
			</div>
		)
	}
}
export default CategorySelector;