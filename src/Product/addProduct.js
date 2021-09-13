import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
class addProduct extends Component
{
    state={
        title: '',
        category: '',
        description: '',
        error_list: [],
    };
    handleInput= (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    saveProduct= async(e)=>{
        e.preventDefault();
        const res= await axios.post('http://127.0.0.1:8000/api/add-product',this.state);
        if (res.data.status === 200){
            // console.log(res.data.message);
            await swal({
                title: "Added",
                text: res.data.message,
                icon: "success",
                button: "Done",
            });
            this.setState({
                title: '',
                category: '',
                description: '',
            });
            this.props.history.push('/');
        }
        else if(res.data.status === 404){
            await swal({
                title: "Warning",
                text: res.data.message,
                icon: "warning",
                button: "Done",
            });
            this.props.history.push('/');
        }
        else{
            this.setState({
                error_list: res.data.validate_err,
            });
        }

    };
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Add Product
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back </Link>
                                </h4>

                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveProduct} >
                                    <div className="form-group mb-3">
                                        <label>Product Title</label>
                                        <input type="text" name="title" onChange={this.handleInput} value={this.state.title} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Category</label>
                                        <input type="text" name="category" onChange={this.handleInput} value={this.state.category}  className="form-control" />
                                        <span className="text-danger">{this.state.error_list.category}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <input type="text" name="description" onChange={this.handleInput} value={this.state.description}  className="form-control" />
                                        <span className="text-danger">{this.state.error_list.description}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Product</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


}
export default addProduct;