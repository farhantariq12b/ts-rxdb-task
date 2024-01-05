import React from 'react';

interface StatusInterface {
  color?: string | 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

const StatusBox: React.FC<StatusInterface> = ({ color = 'green' }) => {
  const getColorClass = () => {
    switch (color) {
      case 'green':
        return 'bg-green-400 border-green-600';
      case 'red':
        return 'bg-red-400 border-red-600';
      case 'yellow':
        return 'bg-yellow-400 border-yellow-600';
      case 'blue':
        return 'bg-blue-400 border-blue-600';
      case 'gray':
        return 'bg-gray-400 border-gray-600';
      default:
        return 'bg-green-400 border-green-600';
    }
  };

  return (
    <div className={`w-[12px] h-[12px] rounded-[22px] border border-solid ${getColorClass()}`} />
  );
};

export default StatusBox;
