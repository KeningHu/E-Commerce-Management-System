import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

class Error extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			// <p className="error">wrong page:)</p>
			<div id="page-wrapper">
				<PageTitle title="Oops! wrong page:("/>
				<div className="row">
					<div className="col-md-12">
						<span>Can not find this path....</span>
						<Link to="/">Go back to home page. Click me!</Link>
					</div>
					
				</div>
			</div>
		);
	}
}
export default Error;
