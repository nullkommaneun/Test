
import React, { useState, useEffect, useCallback, useRef } from 'react';
// Fix: Import BluetoothLEScan type for use with `scanRef`.
import type { DeviceInfo, BluetoothAdvertisingEvent, BluetoothLEScan } from './types';
import Header from './components/Header';
import ScanControls from './components/ScanControls';
import DeviceTable from './components/DeviceTable';

const App: React.FC = () => {
    const [devices, setDevices] = useState<Map<string, DeviceInfo>>(new Map());
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Fix: Use the specific `BluetoothLEScan` type for `scanRef` instead of `any`.
    const scanRef = useRef<BluetoothLEScan | null>(null);

    const loadFromLocalStorage = () => {
        try {
            const savedDevices = localStorage.getItem('ble-devices');
            if (savedDevices) {
                const parsed = JSON.parse(savedDevices);
                // The stored item is an array of [key, value] pairs
                setDevices(new Map(parsed));
            }
        } catch (err) {
            console.error("Failed to load devices from local storage", err);
        }
    };

    const saveToLocalStorage = (devs: Map<string, DeviceInfo>) => {
        try {
            // Convert Map to array of [key, value] pairs for JSON serialization
            const array = Array.from(devs.entries());
            localStorage.setItem('ble-devices', JSON.stringify(array));
        } catch (err) {
            console.error("Failed to save devices to local storage", err);
        }
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    useEffect(() => {
        if (devices.size > 0) {
            saveToLocalStorage(devices);
        } else {
             localStorage.removeItem('ble-devices');
        }
    }, [devices]);

    const handleAdvertisement = useCallback((event: BluetoothAdvertisingEvent) => {
        setDevices(prevDevices => {
            const newDevices = new Map(prevDevices);
            const deviceInfo: DeviceInfo = {
                id: event.device.id,
                name: event.device.name ?? null,
                rssi: event.rssi ?? null,
                txPower: event.txPower ?? null,
                timestamp: Date.now(),
            };
            newDevices.set(event.device.id, deviceInfo);
            return newDevices;
        });
    }, []);

    const stopScan = useCallback(() => {
        if (scanRef.current) {
            scanRef.current.stop();
            console.log('LE Scan stopped.');
            scanRef.current = null;
        }
        // Fix: Use type-safe `navigator.bluetooth` without casting to `any`.
        if (navigator.bluetooth && navigator.bluetooth.removeEventListener) {
            navigator.bluetooth.removeEventListener('advertisementreceived', handleAdvertisement);
        }
        setIsScanning(false);
    }, [handleAdvertisement]);
    
    const handleScanClick = async () => {
        if (isScanning) {
            stopScan();
            return;
        }

        // Fix: Use type-safe `navigator.bluetooth` without casting to `any`.
        if (!navigator.bluetooth) {
            setError("Web Bluetooth API is not available on this browser. Please use Chrome or Edge on a compatible device.");
            return;
        }

        setError(null);

        try {
            // Use requestLEScan if available
            // Fix: Use type-safe `navigator.bluetooth` and check for optional `requestLEScan`.
            if (navigator.bluetooth.requestLEScan) {
                console.log('Requesting Bluetooth LE Scan...');
                const scan = await navigator.bluetooth.requestLEScan({ acceptAllAdvertisements: true });
                scanRef.current = scan;
                
                // Fix: Use type-safe `navigator.bluetooth` without casting to `any`.
                navigator.bluetooth.addEventListener('advertisementreceived', handleAdvertisement);
                
                setIsScanning(true);
                console.log('Scanning for devices...');
            } else {
                 // Fallback to requestDevice for single device selection if LE scan is not supported
                console.log('requestLEScan not available, falling back to requestDevice.');
                // Fix: Use type-safe `navigator.bluetooth` without casting to `any`.
                await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
                setError('Continuous scanning is not supported by your browser. You can select one device at a time with the prompt. The list feature requires a browser with LE Scan support.');
            }
        } catch (err: any) {
            if (err.name === 'NotFoundError') {
                setError('Scan cancelled by user.');
            } else if (err.name === 'NotAllowedError') {
                 setError('Bluetooth permission was denied. Please grant permission in your browser settings.');
            } else {
                setError(`An error occurred: ${err.message}`);
            }
            console.error(err);
            setIsScanning(false);
        }
    };

    const handleClearClick = () => {
        if (window.confirm("Are you sure you want to clear all discovered devices?")) {
            setDevices(new Map());
            localStorage.removeItem('ble-devices');
        }
    };

    const handleExportClick = () => {
        // Fix: Explicitly type `devicesArray` to resolve property access errors on `d`.
        const devicesArray: DeviceInfo[] = Array.from(devices.values());
        if (devicesArray.length === 0) {
            alert("No devices to export.");
            return;
        }
        const header = "Name,ID,RSSI,TX Power,Timestamp\n";
        const rows = devicesArray.map(d => {
            const name = d.name ? `"${d.name.replace(/"/g, '""')}"` : 'N/A';
            const id = d.id;
            const rssi = d.rssi ?? 'N/A';
            const txPower = d.txPower ?? 'N/A';
            const timestamp = new Date(d.timestamp).toISOString();
            return `${name},${id},${rssi},${txPower},${timestamp}`;
        }).join('\n');

        const csvContent = header + rows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `bluetooth_devices_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col h-screen max-h-screen font-sans">
            <Header />
            <ScanControls
                isScanning={isScanning}
                onScanClick={handleScanClick}
                onClearClick={handleClearClick}
                onExportClick={handleExportClick}
                deviceCount={devices.size}
                error={error}
            />
            <main className="flex-grow overflow-y-auto bg-gray-900">
                <DeviceTable devices={devices} />
            </main>
        </div>
    );
};

export default App;
