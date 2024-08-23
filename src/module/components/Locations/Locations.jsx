import { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ street: '', building: '', area: '' });
  const [editingLocation, setEditingLocation] = useState(null); // Set to null initially
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // Configure Axios with the token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Fetch locations
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/locations/index`);
      setLocations(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLocation) {
        await axios.put(`${apiUrl}/locations/update/${editingLocation.id}`, form);
        setEditingLocation(null); // Reset editingLocation to null
      } else {
        await axios.post(`${apiUrl}/locations/store`, form);
      }
      setForm({ street: '', building: '', area: '' });
      fetchLocations();
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Handle editing a location
  const handleEdit = (location) => {
    setEditingLocation(location); // Set editingLocation to the current location
    setForm({ street: location.street, building: location.building, area: location.area });
  };

  // Handle deleting a location
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/locations/destroy/${id}`);
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="building"
          placeholder="Building"
          value={form.building}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={form.area}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingLocation ? 'Update' : 'Create'}
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Location ID</th>
            <th className="border p-2">Street</th>
            <th className="border p-2">Building</th>
            <th className="border p-2">Area</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td className="border p-2">{location.id}</td>
              <td className="border p-2">{location.street}</td>
              <td className="border p-2">{location.building}</td>
              <td className="border p-2">{location.area}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(location)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
