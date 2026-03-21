import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Về chúng tôi */}
          <div>
            <h3 className="text-white text-lg mb-4">Về chúng tôi</h3>
            <p className="text-sm">
              Chuyên cho thuê nhà, chung cư, căn hộ tại Đà Nẵng với giá tốt nhất thị trường.
            </p>
          </div>

          {/* Liên kết */}
          <div>
            <h3 className="text-white text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Trang chủ</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Cho thuê</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-white text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@example.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Đà Nẵng, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h3 className="text-white text-lg mb-4">Mạng xã hội</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Cho thuê nhà Đà Nẵng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
