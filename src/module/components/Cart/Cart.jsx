
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const imagesUrl = import.meta.env.VITE_IMAGES_URL;

  return (
    <section style={{ height:'100% ',marginTop:'135px' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-sky-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img src={`${imagesUrl}/${item.image}`} alt={item.name} className="w-16 h-16 rounded object-cover" />

                  <div>
                    <h3 className="text-sm text-sky-900">{item.name}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-sky-900">
                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">XXS</dd>
                      </div>

                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">White</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor={`quantity-${item.id}`} className="sr-only"> Quantity </label>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          &minus;
                        </button>

                        <input
                          type="number"
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          readOnly
                          className="h-10 w-16 rounded border-gray-200 bg-gray-50 text-center text-xs text-gray-600 [-moz-appearance:_textfield] sm:text-sm"
                        />

                        <button
                          type="button"
                          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </form>

                    <button
                      className="text-gray-600 transition hover:opacity-75"
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <div className="flex justify-end">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-sky-900">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${totalAmount.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd>$4.99</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Tax</dt>
                      <dd>$0.00</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${(totalAmount + 4.99).toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <Link
                      to="/checkout"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
