import React, { useEffect, useState } from 'react';
import { ShieldIcon, KeyIcon, CheckIcon, XIcon, RefreshCwIcon, AlertCircleIcon } from 'lucide-react';
interface TwoFactorAuthProps {
  onComplete: () => void;
  onCancel: () => void;
  userType: string;
}
const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  onComplete,
  onCancel,
  userType
}) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(30);
  // Generate a random code for demo purposes
  const [expectedCode] = useState(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  });
  // Handle input change and auto-focus next input
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Only allow one character
    }
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  // Handle key press for backspace to go to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newVerificationCode = pastedData.split('');
      setVerificationCode(newVerificationCode);
      // Focus the last input
      const lastInput = document.getElementById(`code-5`);
      if (lastInput) {
        lastInput.focus();
      }
    }
  };
  // Verify the code
  const verifyCode = () => {
    const enteredCode = verificationCode.join('');
    setError('');
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (enteredCode === expectedCode) {
        onComplete();
      } else {
        setError('Invalid verification code. Please try again.');
        setVerificationCode(['', '', '', '', '', '']);
        // Focus the first input
        const firstInput = document.getElementById('code-0');
        if (firstInput) {
          firstInput.focus();
        }
      }
      setIsSubmitting(false);
    }, 1000);
  };
  // Handle resend code
  const handleResendCode = () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setResendCountdown(30);
    // Simulate sending a new code
    setTimeout(() => {
      // In a real app, a new code would be sent to the user
      setTimeLeft(120); // Reset main timer
      setError('');
      setVerificationCode(['', '', '', '', '', '']);
      // Focus the first input
      const firstInput = document.getElementById('code-0');
      if (firstInput) {
        firstInput.focus();
      }
    }, 1000);
  };
  // Main countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) {
      setResendDisabled(false);
      return;
    }
    const timer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // Auto-submit when all fields are filled
  useEffect(() => {
    if (verificationCode.every(code => code !== '') && !isSubmitting) {
      verifyCode();
    }
  }, [verificationCode]);
  // Focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById('code-0');
    if (firstInput) {
      firstInput.focus();
    }
    // For demo purposes, show the expected code in the console
    console.log('Demo verification code:', expectedCode);
  }, []);
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center">
            <div className="bg-blue-100 rounded-full p-3">
              <ShieldIcon className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {userType === 'admin' ? 'Admin' : 'District Official'} accounts
            require additional verification
          </p>
          <div className="mt-4 text-center">
            <div className="inline-block bg-blue-50 px-4 py-2 rounded-full">
              <p className="text-sm text-blue-700">
                {timeLeft > 0 ? <>
                    Code expires in{' '}
                    <span className="font-medium">{formatTime(timeLeft)}</span>
                  </> : <>Code has expired. Please request a new one.</>}
              </p>
            </div>
          </div>
          {/* For demo purposes, show the code - would be removed in production */}
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400">Demo code: {expectedCode}</p>
          </div>
          {error && <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
              <div className="flex items-center">
                <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>}
          <div className="mt-6">
            <label htmlFor="code-0" className="block text-sm font-medium text-gray-700 text-center mb-3">
              Enter the 6-digit verification code
            </label>
            <div className="flex justify-center space-x-2">
              {verificationCode.map((digit, index) => <input key={index} id={`code-${index}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e => handleInputChange(index, e.target.value)} onKeyDown={e => handleKeyDown(index, e)} onPaste={index === 0 ? handlePaste : undefined} className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled={isSubmitting} />)}
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button type="button" onClick={onCancel} disabled={isSubmitting} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <XIcon className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button type="button" onClick={verifyCode} disabled={verificationCode.some(code => code === '') || isSubmitting} className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting || verificationCode.some(code => code === '') ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
              {isSubmitting ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </> : <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Verify
                </>}
            </button>
          </div>
          <div className="mt-6 text-center">
            <button type="button" onClick={handleResendCode} disabled={resendDisabled} className={`text-sm font-medium ${resendDisabled ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'}`}>
              <RefreshCwIcon className="inline h-4 w-4 mr-1" />
              {resendDisabled ? `Resend code in ${resendCountdown}s` : 'Resend verification code'}
            </button>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Didn't receive a code? Check your email or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default TwoFactorAuth;