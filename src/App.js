import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import index from "./Product/index";
import addProduct from "./Product/addProduct";
import editProduct from "./Product/editProduct";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={index}/>
          <Route  path="/add-product" component={addProduct}/>
          <Route  path="/edit-product/:id" component={editProduct}/>
        </Switch>
      </Router>

  );
}

export default App;
