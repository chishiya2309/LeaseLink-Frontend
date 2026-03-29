import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { authApi } from "../api/auth";

const disposableDomains = [
  "mailinator.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
];

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự").max(100, "Họ và tên quá dài"),
    email: z
      .string()
      .email("Email không đúng định dạng")
      .refine((val) => {
        const domain = val.split("@")[1];
        return !disposableDomains.includes(domain?.toLowerCase());
      }, "Email tạm thời không được chấp nhận"),
    phone: z.string().regex(/^(0|84|\+84)[35789][0-9]{8}$/, "Số điện thoại di động Việt Nam không hợp lệ"),
    password: z
      .string()
      .min(12, "Mật khẩu phải có ít nhất 12 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ viết hoa")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ viết thường")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số")
      .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
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
    setFormErrors({});
    setSuccess("");

    const validationResult = registerSchema.safeParse(formData);

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

      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      };

      const res = await authApi.registerHost(requestData);

      if (res && res.status === 201) {
        setSuccess("Đăng ký thành công! Hệ thống đang chuyển bạn đến trang đăng nhập...");
        setTimeout(() => {
          navigate("/login");
        }, 1600);
      } else {
        setGeneralError(res.message || "Đăng ký thất bại.");
      }
    } catch (err: any) {
      console.error("API Error:", err);
      let isFieldError = false;
      const newFormErrors: Record<string, string> = {};

      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((errorItem: any) => {
          if (errorItem.field && errorItem.defaultMessage) {
            newFormErrors[errorItem.field] = errorItem.defaultMessage;
            isFieldError = true;
          }
        });
      } else if (typeof err === "object" && err !== null && !err.message) {
        Object.keys(formData).forEach((key) => {
          if (err[key] && typeof err[key] === "string") {
            newFormErrors[key] = err[key];
            isFieldError = true;
          }
        });
      }

      if (isFieldError) {
        setFormErrors((prev) => ({ ...prev, ...newFormErrors }));
      } else {
        setGeneralError(err.message || err.error || "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
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
    <section className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(13,148,136,0.10),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef3f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
              Tạo tài khoản Chủ nhà
            </div>
            <h1 className="text-5xl font-bold leading-tight text-slate-900">
              Bắt đầu đăng tin cho thuê trên LeaseLink chỉ với vài bước.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tạo tài khoản để quản lý bất động sản, theo dõi trạng thái duyệt và làm việc với admin trên cùng một nền tảng.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-[28px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
          <div className="mb-8 flex rounded-2xl bg-slate-100 p-1.5">
            <Link
              to="/login"
              className="flex-1 py-2.5 text-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              Đăng nhập
            </Link>
            <div className="flex-1 rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-slate-900 shadow-sm">
              Đăng ký
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Tạo tài khoản Host</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Điền thông tin bên dưới để gửi yêu cầu đăng ký.</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClassName("fullName")}
              />
              {formErrors.fullName && <p className="mt-1.5 text-[13px] font-medium text-red-500">{formErrors.fullName}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClassName("email")}
              />
              {formErrors.email && <p className="mt-1.5 text-[13px] font-medium text-red-500">{formErrors.email}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="0901234567"
                value={formData.phone}
                onChange={handleChange}
                className={inputClassName("phone")}
              />
              {formErrors.phone && <p className="mt-1.5 text-[13px] font-medium text-red-500">{formErrors.phone}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Mật khẩu</label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                className={inputClassName("password")}
              />
              {formErrors.password && <p className="mt-1.5 text-[13px] font-medium text-red-500">{formErrors.password}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClassName("confirmPassword")}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1.5 text-[13px] font-medium text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng ký"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
