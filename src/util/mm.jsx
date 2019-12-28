class MUtil{
	request(param){
		return new Promise((resolve, reject) => {
		$.ajax({
			type 			: param.type 		|| 'get',
			url  			: param.url 		|| '',
			dataType 		: param.dataType 	|| 'json',
			data 			: param.data 		|| null,
			success         : res => {
				// request successfully
				if(0 === res.status){
					typeof  resolve === 'function' && resolve(res.data, res.msg);
				} 
				// login
				else if(0 === res.status) {
					this.doLogin();

				}
				// force login
				else {
					typeof  reject === 'function' && reject(res.msg || res.data);

				}
			},
			error : err => {
					typeof  reject === 'function' && reject(err.statusText);
			}

			});
		});
	}

	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	// get url parameter
	getUrlParam(name) {
		// xxx/com?param=123&param1=456
		let queryString 	= window.location.search.split('?')[1] || '' ,// search: param=123&param1=456
		    reg 			= new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
		    result 			= queryString.match(reg);
		return result ? decodeURIComponent(result[2]) : null;


	}
	// error message
	errorTips(errMsg) {
		alert( errMsg || "There seems to be something wrong :(");
	}

	successTips(successMsg){
		alert(successMsg || "Operation succeeds!");
	}

	setStorage(name, data){
		let dataType =  typeof data;
		//json
		if( dataType === 'object') {
			window.localStorage.setItem(name, JSON.stringify(data));
		}
		else if(['number',  'string', 'boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name, data);

		} else {
			alert('This input can not be used in local storage');
		}
	}
	
	getStorage(name) {
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}  else {
			return '';
		}
	}

	// remove storage
	removeStorage(name){
		window.localStorage.removeItem(name);
	}


}

export default MUtil;