import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import cartDetail from '../cart/cartDetail';
import NotFound from '../common/NotFound';
import Navi from '../navi/Navi';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';
import Dashboard from './Dashboard';

function App() {
	return (
		<Container>
			<Navi></Navi>
			{/* <Dashboard></Dashboard> */}
			<Switch>
				<Route path="/" exact component={Dashboard}></Route>
				<Route path="/product" component={Dashboard}></Route>
				<Route path="/saveproduct/:productID" component={AddOrUpdateProduct}></Route>
				<Route path="/saveproduct" component={AddOrUpdateProduct}></Route>
				<Route path="/cart" component={cartDetail}></Route>
				<Route component={NotFound}></Route>
			</Switch>
		</Container>
	);
}

export default App;
