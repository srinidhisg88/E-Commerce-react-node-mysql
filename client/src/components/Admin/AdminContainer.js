// // AdminContainer.js

// import React, { useState } from "react";
// import AdminProductDetails from "../AdminProductDetails/AdminProductDetails";
// import ProductList from "../ProductList/AdminProductList";
// import AdminOrderList from "../Orders/AdminOrderList";
// import OrderDetails from "../Orders/OrderDetails";
// import "./AdminContainer.scss";

// const AdminContainer = (props) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showProductList, setShowProductList] = useState(true);

//   const handleProductDetails = (product) => {
//     setSelectedProduct(product);
//   };
//   const handleOrderDetails = (order) => {
//     setSelectedOrder(order);
//   };
//   const onBackClickToProductList = () => {
//     setSelectedProduct(null);
//     setSelectedOrder(null);
//     setShowProductList(true)
//   }
//   const onBackClickToOrderDetails = () => {
//     setSelectedProduct(null);
//     setSelectedOrder(null);
//     setShowProductList(false)
//   }

//   return (
//     <div className="admin-container">
//       {selectedProduct ? (
//         <div className="details-container">
//           <AdminProductDetails productId={selectedProduct.productId} onBackClick={onBackClickToProductList} />
//         </div>
//       ) : (
//         <>
//           <div>
//             {showProductList ? (
//               <div className="product-list-container">
//                 <button onClick={() => setShowProductList(false)}>
//                   Get Order List
//                 </button>
//                 <ProductList handleProductDetails={handleProductDetails} />
//               </div>
//             ) : (
//               <div className="order-list-container">
//                 {selectedOrder ? (
//                   <div className="details-container">
//                     <OrderDetails orderId={selectedOrder.orderId} onBackClick={onBackClickToOrderDetails} />
//                   </div>
//                 ) : (
//                   <div>
//                     <button onClick={() => setShowProductList(true)}>
//                       Get Product List
//                     </button>
//                     <AdminOrderList handleOrderDetails={handleOrderDetails} />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminContainer;
import React, { useState } from "react";
import AdminProductDetails from "../AdminProductDetails/AdminProductDetails";
import ProductList from "../ProductList/AdminProductList";
import AdminOrderList from "../Orders/AdminOrderList";
import OrderDetails from "../Orders/OrderDetails";
import "./AdminContainer.scss";

const AdminContainer = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductList, setShowProductList] = useState(true);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };
  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  const onBackClickToProductList = () => {
    setSelectedProduct(null);
    setSelectedOrder(null);
    setShowProductList(true);
  };
  const onBackClickToOrderDetails = () => {
    setSelectedProduct(null);
    setSelectedOrder(null);
    setShowProductList(false);
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h2>Welcome to the Admin Panel</h2>
        <p>Manage products and orders efficiently with ease.</p>
      </div>

      {selectedProduct ? (
        <div className="details-container">
          <h3>Product Details</h3>
          <AdminProductDetails
            productId={selectedProduct.productId}
            onBackClick={onBackClickToProductList}
          />
        </div>
      ) : (
        <>
          <div>
            {showProductList ? (
              <div className="product-list-container">
                <button onClick={() => setShowProductList(false)} className="toggle-view-button">
                  View Order List
                </button>
                <h3>Product List</h3>
                <p>Here you can view and manage all products available in the system.</p>
                <ProductList handleProductDetails={handleProductDetails} />
              </div>
            ) : (
              <div className="order-list-container">
                {selectedOrder ? (
                  <div className="details-container">
                    <h3>Order Details</h3>
                    <OrderDetails orderId={selectedOrder.orderId} onBackClick={onBackClickToOrderDetails} />
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setShowProductList(true)} className="toggle-view-button">
                      View Product List
                    </button>
                    <h3>Order List</h3>
                    <p>Here you can view and manage all customer orders placed through the platform.</p>
                    <AdminOrderList handleOrderDetails={handleOrderDetails} />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContainer;
