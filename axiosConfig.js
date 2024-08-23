import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// إعداد Axios لإضافة التوكن افتراضيًا في كل طلب
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});


export default instance;