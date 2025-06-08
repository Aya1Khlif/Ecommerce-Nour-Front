import axios from 'axios';

// إعداد متغير URL الخاص بـ API
const apiUrl = import.meta.env.VITE_API_URL;

// إنشاء مثيل مخصص لـ axios
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor لحقن التوكن في كل طلب
instance.interceptors.request.use(
  config => {
    // التحقق من وجود التوكن في localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // إضافة التوكن إلى ترويسة Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor للاستجابة للتعامل مع الأخطاء (مثل انتهاء صلاحية التوكن)
instance.interceptors.response.use(
  response => {
    return response; // إرجاع الاستجابة كما هي إذا كانت صحيحة
  },
  error => {
    if (error.response && error.response.status === 401) {
      // إذا كانت الاستجابة 401 (Unauthorized)، قم بإزالة التوكن
      localStorage.removeItem('token');
      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
