import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg text-white">Về chúng tôi</h3>
            <p className="text-sm leading-7">
              LeaseLink hỗ trợ quản lý và tìm kiếm bất động sản cho thuê tại Đà Nẵng với trải nghiệm rõ ràng hơn cho cả Host và Admin.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg text-white">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-400">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-teal-400">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-teal-400">
                  Đăng ký Host
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-teal-400">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg text-white">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@leaselink.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Đà Nẵng, Việt Nam</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg text-white">Mạng xã hội</h3>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-teal-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="transition-colors hover:text-teal-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="transition-colors hover:text-teal-400">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 LeaseLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
