import MUtil 	from 'util/mm.jsx'
const _mm = new MUtil();
class Statistic{
	// statistic of home page
	getHomeCount(){
		return _mm.request({
 			url: '/manage/statistic/base_count.do'
		});

	}

}

export default Statistic;