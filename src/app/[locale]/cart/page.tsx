import Cart from "./components/Cart";

// todo: fetch the cart items
const getCartItems = async () => {
  return [{}, {}];
};

export default async function CartPage() {
  const cartItems = await getCartItems();

  return <Cart cartItems={cartItems} />;
}
