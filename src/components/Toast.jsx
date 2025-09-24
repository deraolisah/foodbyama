// components/Toast.jsx
import React, { useEffect, useState } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTimes 
} from 'react-icons/fa';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => Math.max(prev - 1, 0));
    }, 40); // Adjust for 4000ms total duration

    return () => clearInterval(interval);
  }, []);

  const getToastConfig = () => {
    const configs = {
      success: {
        icon: FaCheckCircle,
        bgColor: 'bg-green-500',
        textColor: 'text-green-500',
        borderColor: 'border-green-500',
        progressColor: 'bg-green-400'
      },
      error: {
        icon: FaExclamationCircle,
        bgColor: 'bg-red-500',
        textColor: 'text-red-500',
        borderColor: 'border-red-500',
        progressColor: 'bg-red-400'
      },
      warning: {
        icon: FaExclamationTriangle,
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-500',
        borderColor: 'border-yellow-500',
        progressColor: 'bg-yellow-400'
      },
      info: {
        icon: FaInfoCircle,
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-500',
        borderColor: 'border-blue-500',
        progressColor: 'bg-blue-400'
      }
    };
    return configs[type] || configs.info;
  };

  const { icon: Icon, bgColor, textColor, borderColor, progressColor } = getToastConfig();

  return (
    <div className={`
      transform transition-all duration-300 ease-in-out pointer-events-auto
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      min-w-80 max-w-sm bg-white rounded-lg shadow-lg border-l-0 ${borderColor}
      overflow-hidden
    `}>
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className={`h-full ${progressColor} transition-all duration-40 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Toast Content */}
      <div className="flex items-start p-4">
        <div className={`flex-shrink-0 ${textColor}`}>
          <Icon className="text-lg" />
        </div>
        
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        
        <button onClick={onClose} className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors">
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Toast;