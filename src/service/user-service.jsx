import MUtil 	from 'util/mm.jsx'
const _mm = new MUtil();
class User{
	login(loginInfo){
		return _mm.request({
			type: 'post',
 			url: '/manage/user/login.do',
 			data: loginInfo
		});

	}
	// check if data of login interface legal;
	checkLoginInfo(loginInfo) {
		let username = $.trim(loginInfo.username),
		    password = $.trim(loginInfo.password);

		if(typeof username !== 'string' || username.length === 0){
			return {
				status: false,
				msg: 'user name can not be empty!'
			}
		}
		if(typeof password !== 'string' || password.length === 0){
			return {
				status: false,
				msg: 'password can not be empty!'
			}
		}
		return {
			status: true,
			msg: 'Passed validation'
		}
	}

	logout(){
		return _mm.request({
			type   : 'post',
 			url    : '/user/logout.do'
		});

	}

	getUserList(pageNum){
		return _mm.request({
			type   : 'post',
 			url    : '/manage/user/list.do',
 			data   : {
 				pageNum : pageNum
 			}
		});
	}

}

export default User;