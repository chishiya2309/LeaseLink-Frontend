import { Search } from 'lucide-react';
import { useState } from 'react';

export function MapSection() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="relative">
      {/* Google Map */}
      <div className="h-[700px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122391.5026489793!2d108.11829!3d16.047079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x401da17e47aa3afc!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Filter Section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Vị trí */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Vị trí</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Tất cả quận</option>
                <option value="haichau">Hải Châu</option>
                <option value="thanhkhe">Thanh Khê</option>
                <option value="sontra">Sơn Trà</option>
                <option value="nguhanh son">Ngũ Hành Sơn</option>
                <option value="lienChieu">Liên Chiểu</option>
                <option value="camle">Cẩm Lệ</option>
                <option value="hoavang">Hòa Vang</option>
              </select>
            </div>

            {/* Loại Bất động sản */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Loại Bất động sản</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Tất cả Loại</option>
                <option value="nha">Nhà</option>
                <option value="chungcu">Chung cư</option>
                <option value="canho">Căn hộ</option>
              </select>
            </div>

            {/* Sắp xếp */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sắp xếp</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Mặc định</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm">
                <Search size={18} />
                <span>Tìm kiếm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
