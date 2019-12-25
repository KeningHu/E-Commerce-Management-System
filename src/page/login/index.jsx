import React 	from 'react';
import MUtil 	from 'util/mm.jsx'
import User 	from 'service/user-service.jsx'

import './index.scss';
const _mm = new MUtil();
const _user = new User();
class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || ''
		}
	}

	onInputChange(e) {
		let inputValue 	= e.target.value,
			inputName 	= e.target.name;
		this.setState({
			[inputName]: inputValue

		});

	}
	onInputKeyup(e){
		if(e.keyCode === 13) {
			this.onSubmit();
		}
	}
	componentWillMount(){
		document.title = 'login-HAPPYMALL admin';
	}

	onSubmit() {
		let loginInfo = {
			username: this.state.username,
			password: this.state.password
		},
		// verified
		checkResult = _user.checkLoginInfo(loginInfo);
		if(checkResult.status) {
				_user.login(loginInfo).then((res) => {
				// console.log(this.state.redirect);
				_mm.setStorage('userInfo', res);
				this.props.history.push(this.state.redirect);
			}, (errMsg) => {
				_mm.errorTips(errMsg);

			});
			} 
			// not verified
			else {
				_mm.errorTips(checkResult.msg);
			}
		
	}
	render() {
		return (
			<div className="col-md-5 col-md-offset-4">
				<div className="panel panel-default login-panel">
					<div className="panel-heading">Welcome Login  -  HAPPYMALL Management System</div>
					<div className="panel-body">
						<div>
							<div className="form-group">
								<input 	type="text" 
										name="username"
										className="form-control"  
										placeholder="User Name" 
										onKeyUp={e => this.onInputKeyup(e)}
										onChange={e => this.onInputChange(e)}/>
							</div>
							<div className="form-group">
								<input 	type="password" 
										name="password"
										className="form-control" 
										placeholder="Password" 
										onKeyUp={e => this.onInputKeyup(e)}
										onChange={e => this.onInputChange(e)}/>
							</div>
								<button className="btn btn-lg btn-primary btn-block"
										onClick={e => {this.onSubmit()}}>Login</button>
							</div>
					</div>
				</div>
			</div>
			
		);
	}
}

export default Login;