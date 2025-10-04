
import React from 'react';
import { BluetoothIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <BluetoothIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold text-gray-100 tracking-tight">
            Bluetooth LE Scanner
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
