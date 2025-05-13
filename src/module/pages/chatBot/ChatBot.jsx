import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatBodyRef = useRef(null);
  const lastMessageRef = useRef(null);

  // التمرير التلقائي لآخر رسالة
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // إرسال رسالة لـ Rasa API
  const getBotReply = async (message) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://bot-ai.mastercoders.dev/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'user',
          message: message,
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.length > 0) {
        const { text, image, buttons } = data[0];
        return { text: text || 'عذرًا، لم أتمكن من فهم طلبك.', image, buttons };
      }
      return { text: 'عذرًا، لم أتمكن من فهم طلبك.' };
    } catch (error) {
      console.error('خطأ في الاتصال بـ Rasa:', error);
      setIsLoading(false);
      setError('حدث خطأ في الاتصال، حاول مرة أخرى لاحقًا.');
      return { text: 'حدث خطأ، حاول مرة أخرى لاحقًا.' };
    }
  };

  // إرسال رسالة
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { text: message, from: 'user' }]);
    setInput('');
    const botReply = await getBotReply(message);
    setMessages((prev) => [...prev, { ...botReply, from: 'bot' }]);
  };

  // التعامل مع إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // التعامل مع الضغط على Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  // مسح المحادثة
  const clearChat = () => {
    setMessages([{ text: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟', from: 'bot' }]);
    setError(null);
  };

  // خيارات الأزرار السريعة (عامة لمتجر إلكتروني وشركة تقنية)
  const quickOptions = [
    { id: 'opt1', text: 'المنتجات والخدمات', message: 'ما هي الخدمات المتوفرة لديكم؟' },
    { id: 'opt2', text: 'الشحن', message: 'كيف تتم عملية الشحن؟' },
    { id: 'opt3', text: 'معلومات الشركة', message: 'أخبروني عن شركتكم' },
    { id: 'opt4', text: 'التواصل', message: 'كيف يمكنني التواصل معكم؟' },
    { id: 'opt5', text: 'دعم فني', message: 'أحتاج إلى دعم فني' },
    { id: 'opt6', text: 'طرق التواصل', message: 'ما هي طرق التواصل معكم؟' },
    { id: 'opt7', text: 'ساعات العمل', message: 'ما هي ساعات العمل لديكم؟' },
    { id: 'opt8', text: 'نصائح الخدمة', message: 'كيف أختار الخدمة المناسبة؟' },
  ];

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <h3>المساعد الذكي</h3>
            <div className="header-buttons">
              <button onClick={clearChat} className="clear-button" title="مسح المحادثة">
                🗑️
              </button>
              <button onClick={() => setIsOpen(false)} className="close-button" title="إغلاق">
                ✕
              </button>
            </div>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.from === 'bot' ? 'bot' : 'user'}`}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <span className="message-text">{msg.text}</span>
                {msg.image && <img src={msg.image} alt="Bot Image" className="message-image" />}
                {msg.buttons && (
                  <div className="message-buttons">
                    {msg.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(btn.payload)}
                        className="response-button"
                      >
                        {btn.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading">
                <span className="loading-dots">...</span>
              </div>
            )}
            {error && (
              <div className="message error">
                {error}
              </div>
            )}
          </div>
          <div className="chat-footer">
            <form onSubmit={handleSubmit} className="chat-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك..."
                className="chat-input"
                disabled={isLoading}
              />
              <button type="submit" className="send-button" disabled={isLoading}>
                إرسال
              </button>
            </form>
            <div className="quick-options-slider">
              <div className="slider-wrapper">
                <div className="slider-content">
                  {quickOptions.map((option) => (
                    <div key={option.id} className="slider-item">
                      <button
                        onClick={() => handleSendMessage(option.message)}
                        className="quick-button"
                        disabled={isLoading}
                      >
                        {option.text}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;