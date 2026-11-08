import React from 'react';

interface FacebookIconProps {
  className?: string;
  size?: number;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({ className = 'w-4 h-4', size }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
};

export const MessengerIcon: React.FC<FacebookIconProps> = ({ className = 'w-4 h-4', size }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.745 6.616 4.472 8.652v4.237l4.08-2.242c1.096.304 2.255.464 3.448.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.192 14.962l-3.055-3.26-5.964 3.26 6.56-6.963 3.13 3.26 5.89-3.26-6.561 6.963z" />
    </svg>
  );
};
