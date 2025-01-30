// import React, { useState } from "react";
// import CustomerProductList from "../ProductList/CustomerProductList";
// import CustomerOrders from "./CustomerOrders";
// import "./CustomerContainer.scss";

// const CustomerContainer = (props) => {
//   const [isProductsActive, setIsProductsActive] = useState(true);

//   const changeList = () => {
//     setIsProductsActive(!isProductsActive);
//   };

//   return (
//     <div className="customer-container">
//       <div>
//         {isProductsActive ? (
//           <>
//             <button onClick={changeList}>Get My Past Orders</button>
//             <div className="list-container">
//               <CustomerProductList />
//             </div>
//           </>
//         ) : (
//           <>
//             <button onClick={changeList}>Product List</button>
//             <div className="list-container">
//               <CustomerOrders />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerContainer;

import React, { useState } from "react";
import CustomerProductList from "../ProductList/CustomerProductList";
import CustomerOrders from "./CustomerOrders";
import "./CustomerContainer.scss";

const CustomerContainer = (props) => {
  const [isProductsActive, setIsProductsActive] = useState(true);

  const changeList = () => {
    setIsProductsActive(!isProductsActive);
  };

  return (
    <div className="customer-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>
        Here you can view and manage your purchased products and past orders. Use the buttons below to switch between product listings and your order history.
      </p>

      <div>
        {isProductsActive ? (
          <>
            <button onClick={changeList}>View My Past Orders</button>
            <div className="list-container">
              <h3>Your Products</h3>
              <CustomerProductList />
            </div>
          </>
        ) : (
          <>
            <button onClick={changeList}>View Product List</button>
            <div className="list-container">
              <h3>Your Past Orders</h3>
              <CustomerOrders />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerContainer;
