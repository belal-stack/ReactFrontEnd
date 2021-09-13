import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
class index extends Component
{
    state={
        products:[],
        loading:true,
    };
   async componentDidMount() {
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        //console.log(res);
       if (res.data.status === 200){
           this.setState({
              products:res.data.products,
               loading:false,
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
    deleteStudent = async (e,id)=>{
        const clickdel=e.currentTarget;
        clickdel.innerText='Deleting';
       const res = await axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`);
        if (res.data.status === 200) {
            clickdel.closest("tr").remove();
            await swal({
                title: "Deleted",
                text: res.data.message,
                icon: "success",
                button: "Done",
            });
            console.log(res.data.message);
        }


   };

    render() {
        var product_table="";
        if (this.state.loading){
            product_table = <tr><td colSpan="6"><h2>Loading...</h2></td></tr>
        }
        else {
            product_table = this.state.products.map((item) =>{
               return(
                   <tr key={item.id}>
                       <td>{item.id}</td>
                       <td>{item.title}</td>
                       <td>{item.category}</td>
                       <td>{item.description}</td>
                       <td>
                           <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                       </td>
                       <td>
                           <button type="button" onClick={(e)=>this.deleteStudent(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
                       </td>

                   </tr>
               )
            });
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    All Products
                                <Link to={'add-product'} className="btn btn-primary btn-sm float-end">Add Product </Link>
                                </h4>

                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped ">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Title</th>
                                        <th>Product Category</th>
                                        <th>Product Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {product_table}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


}
export default index;