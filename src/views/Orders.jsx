import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaTruck, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./style/orderHistory.css"; // Import styling
import { useGetOrders } from "../hooks/useClient";

const OrderHistory = () => {

  const {data:order, isLoading, error, refetech } = useGetOrders()
  console.log("status", isLoading)
  console.log("issue", error)
  console.log("order", order)
  // Dummy data for orders
  const orders = [
    {
      id: "ORD12345",
      date: "2024-02-01",
      total: 149.99,
      status: "Shipped",
      shipping: {
        name: "John Doe",
        address: "123 Amazon St, New York, NY 10001",
        phone: "+1 123-456-7890",
      },
      items: [
        {
          id: 1,
          name: "Apple AirPods Pro",
          price: 249.99,
          quantity: 1,
          image: "/images/airpods.jpg",
        },
        {
          id: 2,
          name: "Samsung Galaxy S23",
          price: 999.99,
          quantity: 1,
          image: "/images/s23.jpg",
        },
      ],
    },
    {
      id: "ORD67890",
      date: "2024-01-25",
      total: 59.99,
      status: "Delivered",
      shipping: {
        name: "Alice Smith",
        address: "456 Prime Ave, Los Angeles, CA 90012",
        phone: "+1 987-654-3210",
      },
      items: [
        {
          id: 3,
          name: "Sony WH-1000XM5",
          price: 399.99,
          quantity: 1,
          image: "/images/sony_headphones.jpg",
        },
      ],
    },
  ];

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Your Orders</h1>

      {order?.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-summary">
            <div className="order-info">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Order Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                <FaTruck className="icon" /> {order.status}
              </p>
            </div>
            <button onClick={() => toggleOrderDetails(order.id)} className="expand-btn">
              {expandedOrder === order.id ? <FaChevronUp /> : <FaChevronDown />} Details
            </button>
          </div>

          {/* Order Details */}
          {expandedOrder === order.id && (
            <div className="order-details">
              {/* Shipping Info */}
              <div className="shipping-info">
                <h3><FaMapMarkerAlt className="icon" /> Shipping Address</h3>
                <p><strong>Name:</strong> {order.shipping.name}</p>
                <p><strong>Address:</strong> {order.shipping.address}</p>
                <p><strong>Phone:</strong> {order.shipping.phone}</p>
              </div>

              {/* Order Items */}
              <div className="order-items">
                <h3><FaBox className="icon" /> Items Purchased</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <p><strong>{item.name}</strong></p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
