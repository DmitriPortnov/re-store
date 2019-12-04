import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';

import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

const App = props => {
    const { numberOfCartItems, totalPrice } = props;
    return (
        <main role='main' className="container">
            <ShopHeader numItems={ numberOfCartItems } total={ totalPrice } />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/cart" component={CartPage} />
            </Switch>
        </main>
    )
}

const mapStateToProps = state => {
    const { shoppingCart: { orderTotal, countTotal } } = state;
    return {
        numberOfCartItems: countTotal,
        totalPrice: orderTotal
    }
}

export default connect(mapStateToProps)(App);