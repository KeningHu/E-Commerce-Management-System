import React 			from 'react';


class TableList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			isFirstLoading : true
		}
	}
	// isFirstLoading is true only when list is loading in the first time. After first time loading, isFirstLoading is false
	componentWillReceiveProps(){
		this.setState({
			isFirstLoading: false
		});
	}

	render(){
		// table header info
		let tableHeader = this.props.tableHeads.map(
			(tableHead, index) => {
				if(typeof tableHead === 'object') {
					return <th key={index} width={tableHead.width}>{tableHead.name}</th>
				} else if(typeof tableHead === 'string'){
					return <th key={index}>{tableHead}</th>
				}
			}
			
		);
		// list info
		let listBody  = this.props.children;


		let listInfo = (
				<tr >
					<td colSpan={this.props.tableHeads.length} className="text-center">{
						this.state.isFirstLoading ? "loading...."  : 'can not find data :('
					}

					</td>
				</tr>
			);

		let tableBody = listBody.length > 0 ? listBody :  listInfo
		return (
			<div className="row">
				<div className="col-md-12">
					<table className="table tables-striped table-bordered">
						<thead>
							<tr>
								{tableHeader}
							</tr>
						</thead>
						<tbody>
							{tableBody}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default TableList;