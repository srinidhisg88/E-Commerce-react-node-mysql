// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import OrdersByProductId from "../Orders/OrdersByProductId";
// import { getBaseURL } from "../apiConfig"; // Import the getBaseURL function
// import "./AdminProductDetails.scss";

// const ProductDetails = (props) => {
//   // const [id, setId] = useState(props.productId);
//   const [productDetails, setProductDetails] = useState(true);
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState(0);
//   const [productDesc, setProductDesc] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${getBaseURL()}api/products/${props.productId}`) // Use the common base URL
//       .then((res) => {
//         let data = res.data;
//         setProductName(data[0].name);
//         setProductPrice(data[0].price);
//         setProductDesc(data[0].description);
//         setProductDetails(true);
//       })
//       .catch((err) => {
//         console.log("Sorry couldn't fetch details");
//         setProductDetails(false);
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const saveProduct = () => {
//     const productData = {
//       id: props.productId,
//       name: productName,
//       price: productPrice,
//       description: productDesc,
//     };
//     axios
//       .post(`${getBaseURL()}api/products/update`, { ...productData }) // Use the common base URL
//       .then((res) => {
//         console.log("Successful");
//       });
//   };

//   const handleBackClickToProductList = () => {
//     props.onBackClick();
//   };

//   return (
//     <div className="product-details-container">
//       <div className="top-right">
//         <button onClick={handleBackClickToProductList}>Back</button>
//       </div>
//       {productDetails ? (
//         <>
//           <input
//             type="text"
//             value={props.productId}
//             disabled
//             placeholder="Product Id"
//           ></input>
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => {
//               setProductName(e.target.value);
//             }}
//             placeholder="Product Name"
//           ></input>
//           <input
//             type="text"
//             value={productPrice}
//             onChange={(e) => {
//               setProductPrice(e.target.value);
//             }}
//             placeholder="Price"
//           ></input>
//           <input
//             type="text"
//             value={productDesc}
//             onChange={(e) => {
//               setProductDesc(e.target.value);
//             }}
//             placeholder="Description"
//           ></input>
//           <button onClick={(e) => saveProduct()}>Save</button>
//         </>
//       ) : null}

//       <OrdersByProductId productId={props.productId} />
//     </div>
//   );
// };

// export default ProductDetails;

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
