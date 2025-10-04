
import React from 'react';
import type { DeviceInfo } from '../types';
import { BluetoothIcon, ScanIcon } from './Icons';

interface DeviceTableProps {
  devices: Map<string, DeviceInfo>;
}

const RssiIndicator: React.FC<{ rssi: number | null }> = ({ rssi }) => {
    if (rssi === null) return <div className="text-xs text-gray-500">N/A</div>;

    const getSignalInfo = (rssiVal: number): { strength: number; color: string; description: string } => {
        if (rssiVal > -60) return { strength: 5, color: 'bg-cyan-400', description: 'Excellent' };
        if (rssiVal > -70) return { strength: 4, color: 'bg-green-400', description: 'Good' };
        if (rssiVal > -80) return { strength: 3, color: 'bg-yellow-400', description: 'Fair' };
        if (rssiVal > -90) return { strength: 2, color: 'bg-orange-400', description: 'Weak' };
        return { strength: 1, color: 'bg-red-500', description: 'Very Weak' };
    };

    const signalInfo = getSignalInfo(rssi);
    const totalBars = 5;

    return (
      <div className="flex items-center space-x-2" title={`Signal: ${signalInfo.description} (${rssi} dBm)`}>
        <div className="flex items-end space-x-1">
          {Array.from({ length: totalBars }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-sm transition-colors ${
                i < signalInfo.strength ? signalInfo.color : 'bg-gray-600'
              }`}
              style={{ height: `${6 + i * 2}px` }} // Bars with heights 6, 8, 10, 12, 14px
            />
          ))}
        </div>
        <span className="text-sm font-mono text-gray-300">{rssi}</span>
      </div>
    );
};


const DeviceCard: React.FC<{ device: DeviceInfo }> = ({ device }) => {
    return (
      <li className="flex items-center p-4 space-x-4 bg-gray-800">
         <div className="flex-shrink-0 p-3 bg-gray-700 rounded-full">
            <BluetoothIcon className="w-6 h-6 text-blue-300" />
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-lg font-semibold text-white truncate">{device.name || 'Unknown Device'}</p>
          <p className="text-xs text-gray-400 font-mono break-all">{device.id}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
            <div className="flex items-center">
              <span className="font-semibold mr-2">RSSI:</span>
              <RssiIndicator rssi={device.rssi} />
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">TX:</span>
              <span className="font-mono">{device.txPower ?? 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
            <p className="text-xs text-gray-500">{new Date(device.timestamp).toLocaleTimeString()}</p>
        </div>
      </li>
    );
};


const DeviceTable: React.FC<DeviceTableProps> = ({ devices }) => {
  // Fix: Explicitly type `sortedDevices` as `DeviceInfo[]` to correct type inference
  // in `sort` and `map` operations, resolving errors with accessing `rssi` and `id`.
  const sortedDevices: DeviceInfo[] = Array.from(devices.values()).sort((a, b) => (b.rssi ?? -127) - (a.rssi ?? -127));

  if (sortedDevices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <ScanIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-400">No Devices Found</h2>
        <p className="text-gray-500 mt-2">Click "Start Scan" to search for nearby Bluetooth LE devices.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-700">
      {sortedDevices.map(device => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </ul>
  );
};

export default DeviceTable;
