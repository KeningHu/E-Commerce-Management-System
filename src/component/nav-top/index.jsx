import React         from 'react';
import { Link }      from 'react-router-dom';
import MUtil         from 'util/mm.jsx';
import User     from 'service/user-service.jsx';


const _mm = new MUtil();
const _user = new User();

class NavTop extends React.Component{
	constructor(props) {
		super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
	}
    // logout
    onLogout(){
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            // this.props.history.push('/login');
            window.location.href = '/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });

    }
	render() {
		return (
			<div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link> 
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i> 
                        {
                            this.state.username
                            ? <span>welcome, {this.state.username}</span> 
                            :
                            <span>welcome</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={() => {this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
		);
	}
}
export default NavTop;