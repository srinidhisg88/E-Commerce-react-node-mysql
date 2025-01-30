// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getBaseURL } from "../apiConfig";
// import "./AdminOrderList.scss";

// const AdminOrderList = (props) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${getBaseURL()}api/orders`)
//       .then((res) => {
//         const data = res.data;
//         setOrders(data);
//       })
//       .catch((err) => console.log("Couldn't receive order list"));
//   }, []);

//   const openOrderDetails = (order) => {
//     props.handleOrderDetails(order);
//   };

//   return (
//     <div>
//       <div>
//         <h1>Order List</h1>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Customer Name</th>
//             <th>Order Date</th>
//             <th>Price</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.orderId}>
//               <td>{order.orderId}</td>
//               <td>{order.fname}</td>
//               <td>{order.createdDate}</td>
//               <td>{order.totalPrice}</td>
//               <td>
//                 <button onClick={() => openOrderDetails(order)}>Details</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrderList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./AdminOrderList.scss";

const AdminOrderList = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders`)
      .then((res) => {
        const data = res.data;
        setOrders(data);
      })
      .catch((err) => console.log("Couldn't receive order list"));
  }, []);

  const openOrderDetails = (order) => {
    props.handleOrderDetails(order);
  };

  return (
    <div className="admin-orders-container">
      <h2>Manage Orders</h2>
      <p className="description">Here is the list of all customer orders. You can view details or take further action.</p>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.fname}</td>
              <td>{new Date(order.createdDate).toLocaleDateString()}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <button
                  className="view-details"
                  onClick={() => openOrderDetails(order)}
                  title="View Order Details"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
