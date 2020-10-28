import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as productActions from '../../redux/actions/productAction';

class CategoryList extends Component {
	componentDidMount() {
		this.props.actions.getCategories();
	}

	selectCategory = (category) => {
		this.props.actions.changeCategory(category);
		this.props.actions.getProducts(category.categoryID);
	};

	render() {
		return (
			<div>
				<h3>
					<Badge color="warning">Kategoriler</Badge>{' '}
				</h3>
				<ListGroup>
					{this.props.categories.map((category) => (
						<ListGroupItem
							active={category.categoryID === this.props.currentCategory.categoryID}
							onClick={() => this.selectCategory(category)}
							key={category.categoryID}
						>
							{category.name}
						</ListGroupItem>
					))}
				</ListGroup>
				{/* <h5>Seçili Kategori : {this.props.currentCategory.name}</h5> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentCategory: state.changeCategoryReducer,
		categories: state.categoryListReducer,
	};
}

function mapDispatchToProps(dispatch) {
	//aksiyonu proplara bağla
	return {
		actions: {
			getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
			changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
			getProducts: bindActionCreators(productActions.getProducts, dispatch),
		},
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
