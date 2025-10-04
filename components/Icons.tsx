
import React from 'react';

export const BluetoothIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.5 6.5L13 1.9V10.08L18.5 6.5ZM18.5 17.5L13 22.1V13.92L18.5 17.5ZM6.5 8.09L10.25 10.5L6.5 12.9V8.09ZM12 5L6.5 8.5L12 12V5ZM12 19V12L6.5 15.5L12 19ZM20 18V6L14.5 1L13 2V2.91L11.5 4.41L13 5.91V10.09L11 8.9L10.2 11.48L6 18.28V24L14.5 23L20 18ZM15 16.25V7.75L17.2 9.5L15 11.25V14L17.2 15.75L15 17.5V16.25Z" />
  </svg>
);

export const ScanIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 4.5C15.59 4.5 18.5 7.41 18.5 11H16.5C16.5 8.52 14.48 6.5 12 6.5C9.52 6.5 7.5 8.52 7.5 11H5.5C5.5 7.41 8.41 4.5 12 4.5ZM12 2C17.5 2 22 6.5 22 12H20C20 7.58 16.42 4 12 4S4 7.58 4 12H2C2 6.5 6.5 2 12 2ZM11 15.5V20.5H13V15.5H11ZM8.04 14.54L4.5 18.09L5.91 19.5L9.46 15.96L8.04 14.54ZM15.96 15.96L19.5 19.5L18.09 18.09L14.54 14.54L15.96 15.96Z" />
    </svg>
);


export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 20H19V18H5M19 9H15V3H9V9H5L12 16L19 9Z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19A2 2 0 0 0 8 21H16A2 2 0 0 0 18 19V7H6V19Z" />
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 18H6V6H18V18Z" />
    </svg>
);
