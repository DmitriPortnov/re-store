const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1) 
        ]
    }
    if (idx < 0) {
        return [
            ...cartItems,
            item
        ]
    }
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
}

const updateCartItem = (book, item = {}, quantity) => {
    const { id = book.id, title = book.title, count = 0, total = 0 } = item;
    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }
}

const updateTotalPrice = (items) => {
    if (items.length === 0) {
        return 0;
    } else if (items.length === 1) {
        return items[0].total;
    }
    return items.reduce(({total}, nextItem) => {
        return total + nextItem.total
    });
}

const updateTotalCount = (cartItems) => {
    if (cartItems.length === 0) {
        return 0;
    } else if (cartItems.length === 1) {
        return cartItems[0].count;
    }
    return cartItems.reduce(({count}, nextItem) => count + nextItem.count);
}

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state;
    const book = books.find(({ id }) => id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);
    return {
        cartItems: updateCartItems(cartItems, newItem, itemIndex),
        orderTotal: updateTotalPrice(updateCartItems(cartItems, newItem, itemIndex)),
        countTotal: updateTotalCount(updateCartItems(cartItems, newItem, itemIndex))
    }
}

export const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            countTotal: 0
        }
    }
    switch(action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);
        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1);
        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        default:
            return state.shoppingCart;
    }
}