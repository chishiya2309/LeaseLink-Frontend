import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFlowShell } from '../components/auth/AuthFlowShell';
import { AuthPrimaryButton } from '../components/auth/AuthPrimaryButton';
import { AuthTextField } from '../components/auth/AuthTextField';

export default function ForgotPasswordResetPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!formData.password) {
      nextErrors.password = 'Vui lòng nhập mật khẩu mới.';
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Mật khẩu mới cần có ít nhất 8 ký tự.';
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    setSuccessMessage('Mật khẩu mới đã được cập nhật. Đang chuyển bạn về trang đăng nhập...');

    window.setTimeout(() => {
      navigate('/login');
    }, 1400);
  };

  const canSubmit =
    formData.password.trim().length >= 8 &&
    formData.confirmPassword.trim().length >= 8 &&
    formData.password === formData.confirmPassword;

  return (
    <AuthFlowShell
      title="Đặt lại mật khẩu mới"
      description="Tạo một mật khẩu mới. Đảm bảo nó khác với các mật khẩu trước đó để đảm bảo an toàn."
      backTo="/forgot-password/confirmed"
      backLabel="Quay lại bước xác nhận"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthTextField
          label="Password"
          name="password"
          placeholder="Nhập mật khẩu mới"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          toggleablePassword
        />

        <AuthTextField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          toggleablePassword
        />

        <p className="text-sm leading-6 text-slate-500">
          Sử dụng ít nhất 8 ký tự và tránh sử dụng lại mật khẩu trước đó.
        </p>

        <AuthPrimaryButton type="submit" disabled={!canSubmit}>
          Cập nhật mật khẩu
        </AuthPrimaryButton>
      </form>

      {successMessage && (
        <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Muốn đăng nhập?{' '}
        <Link to="/login" className="font-semibold text-[#5b83e8] transition-colors hover:text-[#4a74de]">
          Quay lại đăng nhập
        </Link>
      </p>
    </AuthFlowShell>
  );
}
