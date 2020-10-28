import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productAction';
import ProductDetail from './ProductDetail';

function AddOrUpdateProduct({ products, categories, getProducts, getCategories, saveProduct, history, ...props }) {
	const [product, setProduct] = useState({ ...props.product });
	const [errors, setErrors] = useState({});
	useEffect(() => {
		if (categories.length === 0) {
			getCategories();
		}
		setProduct({ ...props.product });
	}, [props.product]);
	function handleChange(event) {
		const { name, value } = event.target;
		setProduct((previousProduct) => ({
			...previousProduct,
			[name]: name === 'categoryID' ? parseInt(value, 10) : value,
		}));

		validate(name, value);
	}

	function validate(name, value) {
		if (name === 'name' && value === '') {
			setErrors((previousErrors) => ({ ...previousErrors, name: 'Ürün ismi olmalıdır!' }));
		} else {
			setErrors((previousErrors) => ({ ...previousErrors, name: '' }));
		}
	}
	function handleSave(event) {
		event.preventDefault();
		saveProduct(product).then(() => {
			history.push('/');
		});
	}

	return (
		<ProductDetail
			product={product}
			categories={categories}
			onChange={handleChange}
			onSave={handleSave}
			errors={errors}
		></ProductDetail>
	);
}

export function getProductById(products, productID) {
	let product = products.find((product) => product.productID == productID) || null;
	return product;
}

function mapStateToProps(state, ownProps) {
	const productID = ownProps.match.params.productID;
	const product =
		productID && state.productListReducer.length > 0 ? getProductById(state.productListReducer, productID) : {};
	return {
		product,
		products: state.productListReducer,
		categories: state.categoryListReducer,
	};
}

const mapDispatchToProps = {
	getCategories,
	saveProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
