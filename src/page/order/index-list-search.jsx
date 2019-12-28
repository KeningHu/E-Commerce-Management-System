import React 		from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNumber: ''
		}
	}
	// when data changes
	  onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
	// when click search button
	onSearch(){
        this.props.onSearch(this.state.orderNumber);
    }
	// after input keyword, submit automatically
	onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }

	render() {
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select className="form-control">
								<option>Search by Order Number</option>
							</select>
						</div>
							<div className="form-group">
								<input type="text" 
									   className="form-control" 
									   placeholder="order number" 
									   name="orderNumber"
									   onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
									   onChange={(e) => this.onValueChange(e)}/>
							</div>
						<button className="btn btn-primary"
								onClick={(e) => this.onSearch()}>search</button>
					</div>
				</div>
			</div>
		)
	}
}
export default ListSearch;

