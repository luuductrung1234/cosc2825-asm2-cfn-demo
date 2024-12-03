class Cart {
  constructor(customerId, cartItems) {
    this.customerId = customerId;
    this.cartItems = cartItems;
  }

  clearItems = () => {
    this.cartItems = [];
  };

  addItems = (productId, quantity) => {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );

    if (cartItem) cartItem.quantity += quantity;
    else this.cartItems.push({ productId, quantity: parseInt(quantity) });
  };

  removeItems = (productId, quantity) => {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );

    if (!cartItem) return;

    if (cartItem && quantity && cartItem.quantity > quantity) {
      cartItem.quantity -= quantity;
    } else if (
      (cartItem && quantity && cartItem.quantity <= quantity) ||
      (cartItem && !quantity)
    ) {
      let index = this.cartItems.findIndex(
        (item) => item.productId === productId
      );
      this.cartItems.splice(index, 1);
    }
  };

  static fromString = (value) => {
    return JSON.parse(value).map((data) => {
      return new Cart(
        data.customerId,
        data.cartItems.map((item) => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
        }))
      );
    });
  };
}

module.exports = Cart;
