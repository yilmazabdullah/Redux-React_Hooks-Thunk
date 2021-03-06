import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import CartSummary from '../cart/CartSummary';

const Navi = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand>
					<Link to="/">Nort Wint Mağazası</Link>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink>
								<Link to="/saveProduct">Ürün Ekle</Link>
							</NavLink>
						</NavItem>
						<CartSummary></CartSummary>
					</Nav>
					<NavbarText>Simple Text</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navi;
