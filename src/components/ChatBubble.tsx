import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      console.log('Message:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-medium">Nhập nhu cầu thuê nhà</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-teal-700 rounded p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <p className="text-sm text-gray-700">
                Xin chào! Tôi có thể giúp gì cho bạn về nhu cầu thuê nhà?
              </p>
              <p className="text-xs text-gray-500 mt-2">Hãy cho tôi biết:</p>
              <ul className="text-xs text-gray-500 mt-1 ml-4 list-disc">
                <li>Khu vực bạn muốn thuê</li>
                <li>Loại hình bất động sản</li>
                <li>Ngân sách</li>
                <li>Số phòng ngủ</li>
              </ul>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập nhu cầu của bạn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
