import React, { Component } from 'react';
import Select from 'react-select';
import {Link,Redirect} from "react-router-dom";
import ImageUploader from 'react-images-upload';
import {options_category_form,options_status_form} from "./constans.js";
import './FormMovie.css';

class FormAddMovie extends Component {
	constructor(){
		super();
		this.onDrop = this.onDrop.bind(this);
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let id = params.get('id');
		let show_pic = false;
		var find_search_name = '';
		var find_search_pic = '';
		var find_search_category= '';
		var find_search_status = '';
		var edit_post = false;
		
		if(id !== null)
		{
			var movie_search = JSON.parse(localStorage.getItem('movie_item')).filter(item => item.id === parseInt(id));
			if(movie_search.length > 0)
			{
				for (const [index, value] of movie_search.entries()) {
					find_search_name = movie_search[index].moviename;
					find_search_pic = movie_search[index].poster;
					find_search_category = movie_search[index].category;
					find_search_status = movie_search[index].status;
					show_pic = true;
				}
				if(find_search_status === 'on')
				{
					find_search_status = 'On air';
				}
				else
				{
					find_search_status = 'Coming soon';
				}
			}
			edit_post = true;
		
		}
		this.state = {
			category_insert: '',
			status_insert: '',
			toHome: false,
			pictures: [],
			urlpic: [],
			moviename: find_search_name,
			pic: find_search_pic,
			category: find_search_category,
			status: find_search_status,
			show_pic: show_pic,
			edit_post: edit_post,
			id_search: id
		};
	}
	
	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
			pictures: this.state.pictures.concat(pictureFiles),
			urlpic: pictureDataURLs
		});
	}
	state = {
        selectedOption_category: options_category_form[0],
        selectedOption_status: options_status_form[0]
    }
    handleChange_category = (selectedOption_category) => {
        this.setState({ selectedOption_category,category_insert: selectedOption_category.value});
    }
    handleChange_status = (selectedOption_status) => {
        this.setState({ selectedOption_status,status_insert: selectedOption_status.value});
	}
	add(){
		var namemovie = this.refs.namemovie.value;
		var category_insert = this.state.category_insert;
		var status_insert = this.state.status_insert;
		var picture = this.state.urlpic;
		if(this.state.edit_post === true){
			if(namemovie.length > 0 && category_insert !== '' && status_insert !== ''){
				var picture_real = '';
				if(picture.length > 0)
				{
					picture_real = picture[0];
				}
				else
				{
					picture_real = this.state.pic;
				}
				var movie_for_edit = JSON.parse(localStorage.getItem('movie_item')).filter(item => item.id !== parseInt(this.state.id_search));
				var max = 0;
				for (const [index, value] of movie_for_edit.entries()) {
					if(parseInt(movie_for_edit[index]['id']) > max)
					{
						max = parseInt(movie_for_edit[index]['id']);
					}
				}
				var movie_item2 = {id:max+1,moviename:namemovie,category:category_insert,status:status_insert,poster:picture_real};
				movie_for_edit.push(movie_item2);
				localStorage.setItem('movie_item', JSON.stringify(movie_for_edit));
				this.setState({toHome: true});
			}
			else
			{
				if(namemovie === ''){
					alert('Please Fill Name');
				}
				else if(category_insert === ''){
					alert('Please Fill Category');
				}
				else if(status_insert === ''){
					alert('Please Fill Status');
				}
			}
		}
		else
		{
			if(namemovie.length > 0 && category_insert !== '' && status_insert !== '' && picture.length > 0){
				if(localStorage.getItem('movie_item') == null){
					var movie_item = [{id:1,moviename:namemovie,category:category_insert,status:status_insert,poster:picture[0]}];
					localStorage.setItem('movie_item', JSON.stringify(movie_item));
				}
				else
				{
					var movie_item = JSON.parse(localStorage.getItem('movie_item'));
					var max = 0;
					for (const [index, value] of movie_item.entries()) {
						if(parseInt(movie_item[index]['id']) > max)
						{
							max = parseInt(movie_item[index]['id']);
						}
					}
					var movie_item2 = {id:max+1,moviename:namemovie,category:category_insert,status:status_insert,poster:picture[0]};
					movie_item.push(movie_item2);
					localStorage.setItem('movie_item', JSON.stringify(movie_item));
				}
				this.setState({toHome: true});
			}
			else{
				if(namemovie === ''){
					alert('Please Fill Name');
				}
				else if(category_insert === ''){
					alert('Please Fill Category');
				}
				else if(status_insert === ''){
					alert('Please Fill Status');
				}
				else if(picture.length === 0){
					alert('Please Fill Poster');
				}
			}
		}
	}
    render() {
		if (this.state.toHome === true) {
			return <Redirect to='/' />
		}
		const { selectedOption_category,selectedOption_status,moviename,pic,category,status } = this.state;
		const style = this.state.show_pic ? {} : {display: 'none'}
		const style2 = this.state.show_pic ? 'div-50' : ''
		const head = this.state.show_pic ? 'Form Edit Movie' : 'Form Add Movie'
      	return (
        	<div className="contrainer_form">
				<h1>{head}</h1>
				<div className="row">
					<div className={style2}>
						<label>Name</label>
					</div>
					<div className={style2} style={style}>
						<label>Name Before Edit</label>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<input type="text" id="fname" ref="namemovie" placeholder="movie name"/>
					</div>
					<div className={style2} style={style}>
						<input type="text" value={moviename}/>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<label>Category</label>
					</div>
					<div className={style2} style={style}>
						<label>Category Before Edit</label>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<Select
							className="select_add"
							value={selectedOption_category}
							onChange={this.handleChange_category}
							options={options_category_form}
						/>
					</div>
					<div className={style2} style={style}>
						<input type="text" value={category}/>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<label>Status</label>
					</div>
					<div className={style2} style={style}>
						<label>Status Before Edit</label>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<Select
							className="select_add"
							value={selectedOption_status}
							onChange={this.handleChange_status}
							options={options_status_form}
						/>
					</div>
					<div className={style2} style={style}>
						<input type="text" value={status}/>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<label>Poster</label>
					</div>
					<div className={style2} style={style}>
						<label>Poster Before Edit</label>
					</div>
				</div>
				<div className="row">
					<div className={style2}>
						<ImageUploader
							withIcon={true}
							withPreview ={true}
							buttonText='Choose images'
							onChange={this.onDrop}
							imgExtension={['.jpg', '.gif', '.png', '.gif']}
							maxFileSize={5242880}
						/>
					</div>
					<div className={style2} style={style}>
						<img src={pic} className="showpic"/>
					</div>
				</div>
				<button className="button_confirm" onClick={this.add.bind(this)}>Confirm</button>
				<Link to="/"><button className="button_delete">Cancel</button></Link>
			</div>
      	);
    }
}
export default FormAddMovie;