import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';


import './itemPage.scss';

class ItemPage extends Component {

	componentDidMount() {
		if (this.props.menuItems.length === 0) {
			this.props.menuRequested();

			const { RestoService, menuLoaded, menuError } = this.props;
			RestoService.getMenuItems()
				.then(res => menuLoaded(res))
				.catch(error => menuError(error));
		}
	}
	render() {
		const { menuItems, loading, error, addedToCart } = this.props;

		if (error) {
			return (
				<div className="item__page">
					<Error />
				</div>
			)
		}

		if (loading) {
			return (
				<div className="item__page">
					<Spinner />
				</div>
			)
		}

		const item = menuItems.find(el => +el.id === +this.props.match.params.id)
		const { title, url, category, price, id } = item;

		return (
			<div className="menu__item">
				<div className="menu__item item__block">
					<div className="menu__title">{title}</div>
					<img className="menu__img" src={url} alt={title}></img>
					<div className="menu__category">Category: <span>{category}</span></div>
					<div className="menu__price">Price: <span>{price}$</span></div>
					<button onAddToCart={() => addedToCart(id)} className="menu__btn">Add to cart</button>
					<span className={`menu__category_Img ${category}`}></span>
				</div>
			</div>
		);
	};
}


const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = {
	menuLoaded,
	menuRequested,
	menuError,
	addedToCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));