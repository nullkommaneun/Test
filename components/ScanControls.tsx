
import React from 'react';
import { DownloadIcon, ScanIcon, StopIcon, TrashIcon } from './Icons';

interface ScanControlsProps {
  isScanning: boolean;
  onScanClick: () => void;
  onClearClick: () => void;
  onExportClick: () => void;
  deviceCount: number;
  error: string | null;
}

const ScanControls: React.FC<ScanControlsProps> = ({ isScanning, onScanClick, onClearClick, onExportClick, deviceCount, error }) => {
  return (
    <div className="p-4 space-y-4 bg-gray-900">
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={onScanClick}
          className={`flex items-center justify-center w-full px-6 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-transform duration-200 active:scale-95 ${
            isScanning
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isScanning ? (
            <>
              <StopIcon className="w-6 h-6 mr-3" />
              Stop Scanning
            </>
          ) : (
            <>
              <ScanIcon className="w-6 h-6 mr-3" />
              Start Scan
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-gray-400">{deviceCount} {deviceCount === 1 ? 'device' : 'devices'} found</p>
        <div className="flex space-x-2">
          <button
            onClick={onExportClick}
            disabled={deviceCount === 0}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Export to CSV"
          >
            <DownloadIcon className="w-6 h-6" />
          </button>
          <button
            onClick={onClearClick}
            disabled={deviceCount === 0}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Clear device list"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanControls;
