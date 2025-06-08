import { useEffect, useState } from 'react';
import axios from '../../../../axiosConfig'; 
import Locations from "../../components/Locations/Locations";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ order_items: [], total_price: '', date_of_delivery: '' });
  const [editingOrder, setEditingOrder] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/orders/index`);
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      setOrders([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/index`); 
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, key, value) => {
    const newOrderItems = [...form.order_items];
    newOrderItems[index] = { ...newOrderItems[index], [key]: value };
    setForm({ ...form, order_items: newOrderItems });
  };
  
  
  const handleAddProduct = () => {
    // Ensure all fields in existing order items are filled
    if (form.order_items.some(item => !item.product_id || !item.quantity)) {
      console.error('All product fields must be filled.');
      return;
    }

    // Add a new product entry
    setForm({ 
      ...form, 
      order_items: [...form.order_items, { product_id: '', quantity: '' }] 
    });
  };

  const handleEdit = (order) => {
    console.log('Editing order:', order);
  
    // Check if items exist and set the form state accordingly
    setForm({
      order_items: order.items.length > 0 ? order.items : [{ product_id: '', quantity: '' }],
      total_price: order.total_price,
      date_of_delivery: order.date_of_delivery
    });
  
    setEditingOrder(order);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.order_items.length === 0) {
      console.error('Order items cannot be empty.');
      return;
    }

    console.log('Form data before submit:', form);
    try {
      const payload = {
        total_price: form.total_price,
        date_of_delivery: form.date_of_delivery,
        order_items: form.order_items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price // تأكد من تضمين السعر هنا إذا كان مطلوبًا
        })),
      };

      console.log('Payload:', payload);

      if (editingOrder) {
        await axios.post(`${apiUrl}/orders/update/${editingOrder.id}`, payload);
      } else {
        await axios.post(`${apiUrl}/orders/store`, payload);
      }

      // Reset form state after submission
      setForm({ order_items: [], total_price: '', date_of_delivery: '' });
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/orders/destroy/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
        {(form.order_items || []).map((item, index) => (
  <div key={index} className="flex items-center mb-2">
    <select
      value={item.product_id}
      onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
      className="border p-2 mr-2"
    >
      <option value="">Select Product</option>
      {(products || []).map((product) => (
        <option key={product.id} value={product.id}>
          {product.name}
        </option>
      ))}
    </select>
    <input
      type="number"
      placeholder="Quantity"
      value={item.quantity}
      onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
      className="border p-2 mr-2"
    />
    <input
      type="number"
      placeholder="Price"
      value={item.price || ''}
      onChange={(e) => handleProductChange(index, 'price', e.target.value)}
      className="border p-2 mr-2"
    />
  </div>
))}
          <button type="button" onClick={handleAddProduct} className="bg-green-500 text-white p-2">
            Add Product
          </button>
        </div>
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={form.total_price}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="date_of_delivery"
          placeholder="Date of Delivery"
          value={form.date_of_delivery}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2" disabled={form.order_items.length === 0}>
          {editingOrder ? 'Update' : 'Create'}
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Date of Delivery</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(orders || []).map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.total_price}</td>
              <td className="border p-2">{order.date_of_delivery}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Locations />
    </div>
  );
  
};

export default Orders;
