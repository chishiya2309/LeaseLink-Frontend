import React, { useState, useEffect } from 'react';
import axiosClient from './api/axiosClient';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelloMessage = async () => {
      try {
        const response = await axiosClient.get('/hello');

        // Nếu axiosClient KHÔNG có interceptor return response.data
        // thì dùng response.data.
        // Nếu CÓ interceptor return response.data thì response đã là string.
        setMessage(typeof response === 'string' ? response : response.data);
      } catch (error) {
        setMessage('Không thể kết nối đến Backend!');
      } finally {
        setLoading(false);
      }
    };

    fetchHelloMessage();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test Kết Nối React & Spring Boot</h1>
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        }}
      >
        <p>Phản hồi từ Server:</p>
        <h2 style={{ color: loading ? 'gray' : message.includes('thành công') ? 'green' : 'red' }}>
          {loading ? 'Đang gọi API...' : message}
        </h2>
      </div>
    </div>
  );
}

export default App;
