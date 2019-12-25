import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
// import Pagination from 'rc-pagination';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import 'rc-pagination/dist/rc-pagination.min.css';
import Pagination from 'util/pagination/index.jsx';
const _mm   = new MUtil();
const _user = new User();
class UserList extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            firstLoading    : true
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res, () => {
            	this.setState({
            		firstLoading  : false

            	})
            	
            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    onPageNumChange(pageNum){
    	this.setState({
    		pageNum:   pageNum
    	}, () => {
    		this.loadUserList();
    	});
    }
	render(){
		let listBody = this.state.list.map((user, index) => {
						return (<tr key={index}>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>{new Date(user.createTime).toLocaleString()}</td>

								</tr>
								);
						});
		let listError = (
				<tr >
					<td colSpan="5" className="text-center">{
						this.state.firstLoading ? "loading...."  : 'can not find data :('
					}

					</td>
				</tr>
			);

		let tableBody = this.state.list.length > 0 ? listBody :  listError
		return (
			// <p className="error">wrong page:)</p>
			<div id="page-wrapper">
				<PageTitle title="User List"/>
				<div className="row">
					<div className="col-md-12">
						<table className="table tables-striped table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>User Name</th>
									<th>Email</th>
									<th>Phone Number</th>
									<th>Registeration Date</th>
								</tr>
							</thead>
							<tbody>
								{tableBody}
								
							</tbody>
						</table>
					</div>
					
				</div>
				<Pagination current={this.state.pageNum} 
							total={this.state.total} 
							onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
			</div>
		);
	}
}
export default UserList;
