import React, { useEffect, useState, createElement } from 'react';
import { RefreshCwIcon, CheckIcon } from 'lucide-react';
interface CaptchaVerificationProps {
  onVerify: () => void;
  onExpire: () => void;
}
const CaptchaVerification: React.FC<CaptchaVerificationProps> = ({
  onVerify,
  onExpire
}) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  // Generate a random captcha text
  const generateCaptchaText = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  // Generate captcha image
  const generateCaptchaImage = (text: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    canvas.width = 200;
    canvas.height = 60;
    // Fill background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Add noise (dots)
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    // Add noise (lines)
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // Add text
    const fontSize = Math.floor(canvas.height * 0.6);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#334155';
    // Position each character with slight variations
    for (let i = 0; i < text.length; i++) {
      const x = canvas.width / text.length * i + 10;
      const y = canvas.height / 2 + Math.random() * 10 - 5;
      const rotation = (Math.random() - 0.5) * 0.3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
    return canvas.toDataURL();
  };
  // Refresh captcha
  const refreshCaptcha = () => {
    const newCaptchaText = generateCaptchaText();
    setCaptchaText(newCaptchaText);
    setCaptchaImage(generateCaptchaImage(newCaptchaText));
    setUserInput('');
    setIsVerified(false);
    setError('');
    onExpire();
  };
  // Verify captcha
  const verifyCaptcha = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true);
      setError('');
      onVerify();
    } else {
      setError('Incorrect captcha. Please try again.');
      refreshCaptcha();
    }
  };
  // Initialize captcha on mount
  useEffect(() => {
    refreshCaptcha();
    // Set expiration timer (2 minutes)
    const timer = setTimeout(() => {
      if (!isVerified) {
        refreshCaptcha();
      }
    }, 2 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);
  return <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Security Verification
      </div>
      {error && <div className="text-xs text-red-600 mb-2">{error}</div>}
      <div className="mb-3">
        {captchaImage && <div className="relative">
            <img src={captchaImage} alt="CAPTCHA" className="w-full h-16 object-contain rounded border border-gray-200" />
            <button type="button" onClick={refreshCaptcha} className="absolute top-1 right-1 p-1 bg-white rounded-full text-gray-500 hover:text-gray-700">
              <RefreshCwIcon className="h-4 w-4" />
            </button>
          </div>}
      </div>
      {!isVerified ? <div className="flex space-x-2">
          <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Enter the text above" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <button type="button" onClick={verifyCaptcha} disabled={!userInput} className={`px-4 py-2 text-sm font-medium rounded-md ${!userInput ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            Verify
          </button>
        </div> : <div className="flex items-center text-green-600 text-sm">
          <CheckIcon className="h-4 w-4 mr-1" />
          Verification successful
        </div>}
    </div>;
};
export default CaptchaVerification;