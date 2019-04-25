import React, { Component } from 'react';
import Select from 'react-select';
import {Link} from "react-router-dom";
import {options_category,options_status} from "./constans.js";
import './TableMovie.css';
import 'font-awesome/css/font-awesome.min.css';

class TableMovie extends Component {
    constructor(){
		super();
		this.state = {
            movie: JSON.parse(localStorage.getItem('movie_item')),
            arr: [],
        };
        if(this.state.movie === null)
        {
            this.state = {
                movie: [],
            };
        }
	}
    state = {
        selectedOption_category: options_category,
        selectedOption_status: options_status,
    }
    handleChange_category = (selectedOption_category) => {
        this.setState({ selectedOption_category });
        setTimeout(() => {
            this.new_filter();
        }, 300);
    }
    handleChange_status = (selectedOption_status) => {
        this.setState({ selectedOption_status });
        setTimeout(() => {
            this.new_filter();
        }, 300);
    }
    new_filter()
    {
        document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
        var category = this.state.selectedOption_category;
        var status = this.state.selectedOption_status;
        this.state = {
            movie1: JSON.parse(localStorage.getItem('movie_item'))
        };
        if(category === undefined || status === undefined)
        {
            if(category === undefined && status === undefined)
            {
                const updatedList = this.state.movie1;
                this.setState({movie:updatedList})
            }
            else if(category !== undefined)
            {
                if(category.value === 'all')
                {
                    const updatedList = this.state.movie1;
                    this.setState({movie:updatedList})
                }
                else
                {
                    const updatedList = this.state.movie1.filter(item => item.category === category.value);
                    this.setState({movie:updatedList})
                }
            }
            else
            {
                if(status.value === 'all')
                {
                    const updatedList = this.state.movie1;
                    this.setState({movie:updatedList})
                }
                else
                {
                    const updatedList = this.state.movie1.filter(item => item.status === status.value);
                    this.setState({movie:updatedList})
                }
            }
        }
        else
        {
            if(category.value === 'all' && status.value === 'all')
            {
                const updatedList = this.state.movie1;
                this.setState({movie:updatedList})
            }
            else if(category.value === 'all' && status.value !== 'all')
            {
                const updatedList = this.state.movie1.filter(item => item.status === status.value);
                this.setState({movie:updatedList})
            }
            else if(category.value !== 'all' && status.value === 'all')
            {
                const updatedList = this.state.movie1.filter(item => item.category === category.value);
                this.setState({movie:updatedList})
            }
            else
            {
                const updatedList = this.state.movie1.filter(item => item.category === category.value && item.status === status.value);
                this.setState({movie:updatedList})
            }
        }
    }
    handleChange = e => {
        const id = e.target.id;
        const {arr} = this.state;
        var newArray = this.state.arr;    
        if(e.target.checked === true)
        {
            newArray.push(id);   
        }
        else
        {
            var index = newArray.indexOf(id)
            if (index !== -1) {
                newArray.splice(index, 1);
            }
        }
        newArray.sort(function(a, b){return a-b});
        this.setState({arr:newArray})
    };
    delete()
    {
        const {arr} = this.state;
        var newArray = JSON.parse(localStorage.getItem('movie_item'));
        for (const [index, value] of arr.entries()) {
            const updatedList1 = newArray.filter(item => item.id !== parseInt(arr[index]));
            newArray = updatedList1
        }
        localStorage.removeItem('movie_item');
        localStorage.setItem('movie_item', JSON.stringify(newArray));
        setTimeout(() => {
            this.new_filter();
        }, 300);
    }
    render() {
        const { selectedOption_category,selectedOption_status} = this.state;
        const items = this.state.movie.map((item,index) =>
            <tr key={item.id}>
                <td className="center">
                    <input
                        type="checkbox"
                        id={item.id}
                        onChange={this.handleChange}
                    />
                </td>
                <td className="center">
                    <Link to={`/form?id=${item.id}`}><i className="fa fa-edit"/></Link>
                </td>
                <td className="center">{index+1}</td>
                <td className="center"><img src={item.poster} className="poster_img"></img></td>
                <td>{item.moviename}</td>
                <td className="center">{item.category}</td>
                <td className="center">{item.status==='on'?'On Air':'Coming Soon'}</td>
            </tr>
        );
        return (
            <div className="contrainer">
                <h1>Movie Management</h1>
                <div className="filter">
                    <Link to="/form"><button className="button_add">Add</button></Link>
                    <button className="button_delete" onClick={this.delete.bind(this)}>Delete</button>
                    <div className="filter_right">
                    <Select
                        className="select_op"
                        defaultValue={{label: "All Category",value: 0}}
                        value={selectedOption_category}
                        onChange={this.handleChange_category}
                        options={options_category}
                    />
                    <Select
                        className="select_op"
                        defaultValue={{label: "All Status",value: 0}}
                        value={selectedOption_status}
                        onChange={this.handleChange_status}
                        options={options_status}
                    />
                    </div>
                </div>
                <div className="table_responsive">
                    <table>
                    <thead>
                        <tr>
                            <th className="check_box"></th>
                            <th></th>
                            <th className="hashtag">#</th>
                            <th>Poster</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length!==0?items:<tr><td colSpan="7" className="center">ไม่มีข้อมูล</td></tr>}
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default TableMovie;