import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil        from 'util/mm.jsx'
import Product         from 'service/product-service.jsx'
import 'rc-pagination/dist/rc-pagination.min.css';

const _mm   = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{

	constructor(props){
        super(props);
        this.state = {
            categoryList         : [],
            parentId             : 0,
            categoryName         : ''
        };
    }
    // 
    componentDidMount(){
        this.loadCategoryList();
    }

    // load categoryList, to show parent category list
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList : res
            });
            	
          
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // data on form change
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value

        });
    }

    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        // category name can not be null
        if(categoryName){
            _product.saveCategory({
                parentId        : this.state.parentId,
                categoryName    : categoryName
            }).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // get error msg
        else{
            _mm.errorTips('请输入品类名称');
        }
    }
   
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="Category List"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                            <div className="form-group">
                                    <label className="col-md-2 control-label">Category</label>
                                    <div className="col-md-5">
                                        <select name="parentId" 
                                                className="form-control"
                                                onChange={(e) => this.onValueChange(e)}>
                                            <option value="0">
                                                root category
                                            </option>
                                            {
                                                this.state.categoryList.map((category, index) => {
                                                    return <option value={category.id} key={index}>root category/{category.name}</option>

                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 control-label">Category Name</label>
                                    <div className="col-md-5">
                                        <input  type="text" 
                                                className="form-control" 
                                                placeholder="please input Category Name" 
                                                name="categoryName"
                                                value={this.state.name}
                                                onChange={(e) => this.onValueChange(e)}/>
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
                    </div>
				</div>
		);
	}
}
export default CategoryAdd;
