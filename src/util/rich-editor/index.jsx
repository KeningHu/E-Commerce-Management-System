import React 			from 'react';
import Simditor 		from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';
// rich text editior, based on jquery
class RichEditor extends React.Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.loadEditor();
	}

	// componentWillReceiveProps(nextProps){
	// 	let detailChange = this.props.detail !== nextProps.detail;
	// 	if(!detailChange) {
	// 		return;
	// 	}

	// 	this.simditor.setValue(nextProps.value);
	// }
	componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }

	loadEditor(){
		let element =  this.refs['textarea'];
		// Simditor.
		this.simditor = new Simditor({
			textarea: $(element),
			locale : "en-US",
			defaultValue: this.props.placeholder || 'please input',
			upload: {
				url 			: '/manage/product/richtext_img_upload.do',
				defaultImage 	: '',
				fileKey  		: 'upload_file'
			}
		});
		this.bindEditorEvent();
	}
	// event: initialize rich-text editor
	bindEditorEvent(){
		this.simditor.on('valuechanged', e  => {
			this.props.onValueChange(this.simditor.getValue());
		})
	}

	render(){
		return (
			<div className="row">
				<textarea ref="textarea"></textarea>
			</div>

		);
	}
}
export default RichEditor;