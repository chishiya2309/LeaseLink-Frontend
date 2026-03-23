import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthFlowShell } from '../components/auth/AuthFlowShell';
import { AuthPrimaryButton } from '../components/auth/AuthPrimaryButton';
import { OtpCodeField } from '../components/auth/OtpCodeField';

interface VerifyLocationState {
  email?: string;
}

function maskEmail(email: string) {
  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) {
    return email;
  }

  if (localPart.length <= 3) {
    return `${localPart[0] ?? ''}***@${domain}`;
  }

  return `${localPart.slice(0, 3)}${'*'.repeat(Math.max(localPart.length - 3, 2))}@${domain}`;
}

export default function ForgotPasswordVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as VerifyLocationState;
  const email = state.email ?? 'contact@lscodetech.com';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  const maskedEmail = useMemo(() => maskEmail(email), [email]);

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError('Vui lòng nhập đầy đủ 6 chữ số xác thực.');
      return;
    }

    setError('');
    navigate('/forgot-password/confirmed', {
      state: {
        email,
        code,
      },
    });
  };

  return (
    <AuthFlowShell
      title="Kiểm tra email của bạn"
      description={`Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến ${maskedEmail}, vui lòng nhập các chữ số OTP bên dưới để tiếp tục.`}
      backTo="/forgot-password"
      backLabel="Quay lại nhập email"
    >
      <form onSubmit={handleVerify} className="space-y-6">
        <OtpCodeField
          value={code}
          onChange={(value) => {
            setCode(value);
            if (error) {
              setError('');
            }
          }}
          error={error}
        />

        <AuthPrimaryButton type="submit" disabled={code.length !== 6}>
          Xác nhận OTP
        </AuthPrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Vẫn chưa nhận được email?{' '}
        <button
          type="button"
          onClick={() => setResent(true)}
          className="font-semibold text-[#5b83e8] transition-colors hover:text-[#4a74de]"
        >
          Gửi lại email
        </button>
      </p>

      {resent && (
        <p className="mt-3 text-center text-sm text-green-600">
          Một email xác thực mới đã được gửi đến {maskedEmail}.
        </p>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Sai địa chỉ email?{' '}
        <Link to="/forgot-password" className="font-semibold text-[#5b83e8] transition-colors hover:text-[#4a74de]">
          Đổi email
        </Link>
      </p>
    </AuthFlowShell>
  );
}
