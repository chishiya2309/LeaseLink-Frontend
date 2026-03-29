import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { authApi } from "../api/auth";

const loginSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(location.state?.error || "");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setGeneralError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");
    setSuccess("");
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
      const res = await authApi.login(formData);

      if (res.status === 200) {
        const { accessToken, refreshToken, user } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        setSuccess(res.message || "Đăng nhập thành công");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      } else {
        setGeneralError(res.message || "Đăng nhập thất bại.");
      }
    } catch (err: any) {
      console.error("API Error detailed:", err);

      let errorMessage = "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";

      if (err.message && !err.message.includes("status code")) {
        errorMessage = err.message;
      } else if (err.error && typeof err.error === "string") {
        errorMessage = err.error;
      } else if (err.response?.data) {
        const data = err.response.data;
        if (data.message) errorMessage = data.message;
        else if (data.error) errorMessage = data.error;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Keep formData untouched so users do not have to re-enter everything.
      setGeneralError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = (fieldName: string) =>
    `w-full rounded-2xl border px-4 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 ${
      formErrors[fieldName]
        ? "border-red-500 bg-red-50/40 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 bg-slate-50/80 focus:border-teal-500 focus:bg-white focus:ring-teal-100"
    }`;

  return (
    <section className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef3f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm backdrop-blur">
              LeaseLink for Hosts & Admins
            </div>
            <h1 className="text-5xl font-bold leading-tight text-slate-900">
              Đăng nhập để tiếp tục quản lý tin đăng và tài khoản của bạn.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Một không gian gọn gàng để chủ nhà đăng tin nhanh hơn và admin kiểm soát toàn bộ hệ thống dễ hơn.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
          <div className="mb-8 flex rounded-2xl bg-slate-100 p-1.5">
            <div className="flex-1 rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-slate-900 shadow-sm">
              Đăng nhập
            </div>
            <Link
              to="/register"
              className="flex-1 py-2.5 text-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              Đăng ký
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Chào mừng quay lại</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Đăng nhập vào tài khoản của bạn để tiếp tục.</p>
          </div>

          {generalError && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <span className="leading-6">{generalError}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="host@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClassName("email")}
              />
              {formErrors.email && <p className="text-[13px] font-medium text-red-500">{formErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClassName("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.password && <p className="text-[13px] font-medium text-red-500">{formErrors.password}</p>}
            </div>

            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" className="text-[13px] font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
