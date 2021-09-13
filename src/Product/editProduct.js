import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
class editProduct extends Component
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

    async componentDidMount() {


        const productId = this.props.match.params.id;
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-product/${productId}`);
        console.log(res);
        if (res.data.status === 200){
            this.setState({
                title: res.data.product.title,
                category: res.data.product.category,
                description: res.data.product.description,
            });

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
    };
    updateProduct= async(e)=>{
        e.preventDefault();
        const productId = this.props.match.params.id;
        const res= await axios.put(`http://127.0.0.1:8000/api/update-product/${productId}`,this.state);
        if (res.data.status === 200){
            await swal({
                title: "Updated",
                text: res.data.message,
                icon: "success",
                button: "Done",
            });
            this.props.history.push('/');
             console.log(res.data.message);
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
                                    Update Product
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back </Link>
                                </h4>

                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateProduct} >
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
                                        <button type="submit" className="btn btn-primary">Update Product</button>
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
export default editProduct;