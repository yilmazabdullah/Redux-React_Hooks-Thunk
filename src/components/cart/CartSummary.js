import alertify from 'alertifyjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';

class CartSummary extends Component {
	removeFromCart(product) {
		this.props.actions.removeFromCart(product);
		alertify.error(product.name + ' sepetten silindi.');
	}
	renderEmpty() {
		return (
			<NavItem>
				<NavLink>Sepetiniz boş.</NavLink>
			</NavItem>
		);
	}
	renderSummary() {
		return (
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					Sepetiniz
				</DropdownToggle>
				<DropdownMenu right>
					{this.props.cart.map((cartItem) => (
						<DropdownItem key={cartItem.product.productID}>
							<Badge color="danger" onClick={() => this.removeFromCart(cartItem.product)}>
								X
							</Badge>
							{cartItem.product.name}
							<Badge color="success">{cartItem.quantity}</Badge>
						</DropdownItem>
					))}

					<DropdownItem divider />
					<DropdownItem>
						<Link to={'/cart'}> Sepete Git</Link>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		);
	}
	render() {
		return <div>{this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}</div>;
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
export default connect(mapStateToProps, mapDispatchTopProps)(CartSummary);
