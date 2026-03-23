import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { z } from 'zod';

// Zod Schema for Validation
const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  role: z.enum(['HOST', 'ADMIN'])
});

type Role = 'HOST' | 'ADMIN';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'HOST' as Role,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');
    setFormErrors({});

    const validationResult = loginSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten();
      const newFormErrors: Record<string, string> = {};
      
      Object.entries(flattenedErrors.fieldErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          newFormErrors[key] = messages[0];
        }
      });
      
      setFormErrors(newFormErrors);
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const res = await authApi.login(formData);
      
      // Simulated API call for UI testing layout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      console.log('Login attempt with:', formData);
      navigate('/');
      
    } catch (err: any) {
      console.error("API Error:", err);
      setGeneralError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = (fieldName: string) => `
    w-full px-4 py-3 bg-[#f8fafc] border focus:bg-white focus:outline-none focus:ring-4 rounded-xl text-sm transition-all
    ${formErrors[fieldName] 
      ? 'border-red-500 focus:ring-red-100 focus:border-red-500 bg-red-50/30' 
      : 'border-slate-200 focus:ring-slate-100 focus:border-slate-300 hover:border-slate-300'
    }
  `;

  return (
    <div className="flex flex-col flex-grow items-center justify-center p-4 min-h-[calc(100vh-64px)]" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] sm:p-8 p-6 mx-auto border border-gray-100/50">
        
        {/* Tabs */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl mb-8 relative">
          <div className="flex-1 text-center py-2.5 text-sm font-semibold bg-white text-slate-900 shadow-[0_2px_8px_rgb(0,0,0,0.04)] rounded-xl relative z-10 transition-all">
            Đăng nhập
          </div>
          <Link to="/register" className="flex-1 text-center py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors z-10">
            Đăng ký
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-slate-900 mb-2 tracking-tight">Đăng nhập</h1>
          <p className="text-slate-500 text-sm">Đăng nhập vào tài khoản của bạn</p>
        </div>

        {generalError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Email</label>
            <input
              type="email"
              name="email"
              placeholder="host@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClassName('email')}
            />
            {formErrors.email && <p className="text-[13px] text-red-500 font-medium animate-in slide-in-from-top-1">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={inputClassName('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formErrors.password && <p className="text-[13px] text-red-500 font-medium animate-in slide-in-from-top-1">{formErrors.password}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Đăng nhập với vai trò</label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-300 hover:border-slate-300 rounded-xl text-sm transition-all appearance-none cursor-pointer ${formData.role === 'HOST' ? 'text-slate-900 font-medium' : 'text-slate-700'}`}
              >
                <option value="HOST" className="font-medium">Chủ nhà (Host)</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-1">
             <a href="#" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#030213] hover:bg-slate-800 text-white text-[15px] font-semibold rounded-xl transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] flex justify-center items-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="group-hover:scale-[1.02] transition-transform">Đăng nhập</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
