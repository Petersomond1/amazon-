import React, { useState } from "react";
import { FaBox, FaTruck, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaEdit, FaCheckCircle, FaSearch } from "react-icons/fa";
import "../style/adminHistory.css"; // Import styling
import { useGetOrders } from "../../hooks/useAdmin"; // Assuming a custom hook for fetching orders

const AdminOrderHistory = () => {
  const { data: orders, isLoading, error } = useGetOrders(); // Fetch orders
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusEditMode, setStatusEditMode] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Toggle order details visibility
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId) => {
    console.log(`Status for ${orderId} updated to: ${statusToUpdate}`);
    setStatusEditMode(false); // Reset edit mode after status update
  };

  const handleStatusInputChange = (e) => {
    setStatusToUpdate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort the orders
  const filteredOrders = orders?.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.shipping?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(order => 
      statusFilter ? order.status.toLowerCase() === statusFilter.toLowerCase() : true)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "total") {
        return b.total - a.total;
      }
      return 0;
    });

  return (
    <div className="admin-order-history-container">
      <h1 className="admin-order-history-title">Admin Order Management</h1>

      {/* Search and Filter Bar */}
      <div className="admin-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders by ID or Customer"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filters">
          <select value={statusFilter} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Loading orders...</div>
      ) : error ? (
        <div className="error">Error loading orders: {error.message}</div>
      ) : (
        <div className="order-grid">
          {filteredOrders?.map((order) => (
            <div key={order.id} className="admin-order-card">
              <div className="order-summary">
                <div className="order-info">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${order.total?.toFixed(2) || 0.00}</p>
                  <p className={`order-status ${order.status?.toLowerCase()}`}>
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
                    <p><strong>Name:</strong> {order.shipping?.name || "N/A"}</p>
                    <p><strong>Address:</strong> {order.shipping?.address || "N/A"}</p>
                    <p><strong>Phone:</strong> {order.shipping?.phone || "N/A"}</p>
                  </div>

                  {/* Order Items */}
                  <div className="order-items">
                    <h3><FaBox className="icon" /> Items Purchased</h3>
                    {order.items?.map((item) => (
                      <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                          <p><strong>{item.name}</strong></p>
                          <p>Price: ${item.price?.toFixed(2) || 0.00}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Update Section */}
                  <div className="status-update">
                    <h3>Update Status</h3>
                    <div className="status-actions">
                      {statusEditMode ? (
                        <div className="status-input">
                          <select onChange={handleStatusInputChange} value={statusToUpdate}>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => handleStatusChange(order.id)} className="status-update-btn">
                            <FaCheckCircle /> Update
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setStatusEditMode(true)} className="edit-status-btn">
                          <FaEdit /> Edit Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderHistory;
