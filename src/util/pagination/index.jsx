import React 			from 'react';
import RcPagination 	from 'rc-pagination';
import MUtil 			from 'util/mm.jsx'
import User 			from 'service/user-service.jsx'
import PageTitle 		from 'component/page-title/index.jsx';

import 'rc-pagination/dist/rc-pagination.min.css';
const _mm = new MUtil();
const _user = new User();

// pagination component
class Pagination extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row">
				<div className="col-md-12">
					<RcPagination {...this.props} 
					hideOnSinglePage/>
				</div>
			</div>
		);
	}
}
export default Pagination;