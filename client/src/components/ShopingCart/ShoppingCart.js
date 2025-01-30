// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { getBaseURL } from "../apiConfig";
// import "./ShoppingCart.scss"; // Import the CSS file

// const ShoppingCart = (props) => {
//   const [cartProducts, setCartProducts] = useState(props.cartProducts);
//   const customerId = sessionStorage.getItem("customerId");

//   useEffect(() => {
//     axios
//       .get(`${getBaseURL()}api/cart/${customerId}`)
//       .then((res) => {
//         let productsInCart = res.data;
//         setCartProducts(productsInCart);
//       })
//       .catch((err) => console.log("Error occurred"));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.cartProducts]);

//   const buyProducts = () => {
//     props.buyProducts();
//   };

//   return (
//     <>
//       {cartProducts?.length > 0 ? (
//         <>
//           <h1>Shopping Cart</h1>
//           <div>
//             <table className="shopping-cart-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Quantity</th>
//                   <th>Total Price</th>
//                   <th>Remove</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartProducts.map((product) => (
//                   <tr key={product.productId}>
//                     <td>{product.name}</td>
//                     <td>{product.quantity}</td>
//                     <td>{product.price * product.quantity}</td>
//                     <td>
//                       <button
//                         onClick={() =>
//                           props.removeProduct(product.productId)
//                         }
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="address-container">
//               <input
//                 type="text"
//                 className="address-input"
//                 placeholder="Address"
//                 value={props.address}
//                 onChange={(e) => props.updateAddress(e.target.value)}
//               />
//               <button className="buy-button" onClick={buyProducts}>
//                 Buy
//               </button>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default ShoppingCart;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./ShoppingCart.scss"; // Import the CSS file

const ShoppingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const customerId = sessionStorage.getItem("customerId");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/cart/${customerId}`)
      .then((res) => {
        setCartProducts(res.data);
      })
      .catch(() => setMessage("Error loading cart. Please try again."));
  }, [props.cartProducts]);

  const buyProducts = () => {
    if (!props.address) {
      setMessage("Please enter your address to proceed.");
      return;
    }

    setLoading(true);
    props.buyProducts();
    setTimeout(() => {
      setMessage("✅ Purchase successful!");
      setLoading(false);
      setCartProducts([]);
    }, 1500);
  };

  return (
    <div className="shopping-cart-container">
      <h1>🛒 Your Shopping Cart</h1>
      {message && <p className="cart-message">{message}</p>}
      
      {cartProducts?.length > 0 ? (
        <div className="cart-card">
          <table className="shopping-cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => props.removeProduct(product.productId)}
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="address-container">
            <input
              type="text"
              className="address-input"
              placeholder="Enter your shipping address"
              value={props.address}
              onChange={(e) => props.updateAddress(e.target.value)}
            />
            <button className="buy-button" onClick={buyProducts} disabled={loading}>
              {loading ? "Processing..." : "🛍️ Buy Now"}
            </button>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">🛒 Your cart is empty! Start adding products now.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
