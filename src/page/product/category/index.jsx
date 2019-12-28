import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
// import Pagination from 'rc-pagination';
import MUtil        from 'util/mm.jsx'
import Product         from 'service/product-service.jsx'
import 'rc-pagination/dist/rc-pagination.min.css';

const _mm   = new MUtil();
const _product = new Product();
class CategoryList extends React.Component{

	constructor(props){
        super(props);
        this.state = {
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0
        };
    }

    componentDidMount(){
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId  : newId
            }, () => {
                this.loadCategoryList();
            })

        }

    }


    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list : res
            });
            	
          
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // update category name
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('Please input new category name', categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });

        }
    }
   
	render(){
		let listBody = this.state.list.map((category, index) => {
				return (<tr key={index}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>
                             <a className="opear"
                            onClick={(e) => this.onUpdateName(category.id, category.name)}>Change name</a>
                            <p></p>
                            {
                                category.parentId === 0
                                ? <Link to={`/product-category/index/${category.id}`}>View child category</Link>
                                : null
                            }
                            </td>
						</tr>
				);
		});
		return (
			// <p className="error">wrong page:)</p>
			<div id="page-wrapper">
				<PageTitle title="Category List">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>Add category</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>
                           Parent categoryID: {this.state.parentCategoryId}
                        </p>
                    </div>
                </div>
				<TableList tableHeads={['Category ID', 'Category Name', 'Operation']}>
				    {listBody}
				</TableList>
		    </div>
		);
	}
}
export default CategoryList;
