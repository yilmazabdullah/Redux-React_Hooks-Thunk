import alertify from 'alertifyjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';

class cartDetail extends Component {
	removeFromCart(product) {
		this.props.actions.removeFromCart(product);
		alertify.error(product.name + ' sepetten silindi.');
	}
	render() {
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Unit Price</th>
							<th>Quantity</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.cart.map((cartItem) => (
							<tr key={cartItem.product.productID}>
								<th scope="row">{cartItem.product.productID}</th>
								<td>{cartItem.product.name}</td>
								<td>{cartItem.product.unitPrice}</td>
								<td>{cartItem.quantity}</td>
								<td>
									<Button color="danger" onClick={() => this.removeFromCart(cartItem.product)}>
										Sil
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cartReducer,
	};
}

function mapDispatchTopProps(dispatch) {
	return {
		actions: {
			removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
		},
	};
}
export default connect(mapStateToProps, mapDispatchTopProps)(cartDetail);
