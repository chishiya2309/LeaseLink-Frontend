import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFlowShell } from '../components/auth/AuthFlowShell';
import { AuthPrimaryButton } from '../components/auth/AuthPrimaryButton';
import { AuthTextField } from '../components/auth/AuthTextField';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Vui lòng nhập email để đặt lại mật khẩu.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Email không đúng định dạng.');
      return;
    }

    setError('');
    navigate('/forgot-password/verify', {
      state: {
        email,
      },
    });
  };

  return (
    <AuthFlowShell
      title="Quên mật khẩu"
      description="Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu."
      backTo="/login"
      backLabel="Quay lại đăng nhập"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthTextField
          label="Email của bạn"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) {
              setError('');
            }
          }}
          error={error}
        />

        <AuthPrimaryButton type="submit" disabled={!email.trim()}>
          Đặt lại mật khẩu
        </AuthPrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Đã nhớ mật khẩu của bạn?{' '}
        <Link to="/login" className="font-semibold text-[#5b83e8] transition-colors hover:text-[#4a74de]">
          Quay lại đăng nhập
        </Link>
      </p>
    </AuthFlowShell>
  );
}
