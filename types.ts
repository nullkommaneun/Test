
export interface DeviceInfo {
  id: string;
  name: string | null;
  rssi: number | null;
  txPower: number | null;
  timestamp: number;
}

// Simplified Web Bluetooth types to ensure code completion and type safety
// as @types/web-bluetooth might not be available in the environment.
export interface SimpleBluetoothDevice {
    id: string;
    name?: string | null;
}

export interface BluetoothAdvertisingEvent extends Event {
    readonly device: SimpleBluetoothDevice;
    readonly rssi?: number;
    readonly txPower?: number;
}

// Fix: Add missing Web Bluetooth API typings to enable type-safe access
// to navigator.bluetooth and related features.
export interface BluetoothLEScan {
  stop: () => void;
}

interface RequestDeviceOptions {
  acceptAllDevices?: boolean;
  filters?: any[];
  optionalServices?: string[];
}

interface Bluetooth {
  requestDevice(options?: RequestDeviceOptions): Promise<SimpleBluetoothDevice>;
  requestLEScan?(options?: { acceptAllAdvertisements?: boolean; }): Promise<BluetoothLEScan>;
  addEventListener(type: 'advertisementreceived', listener: (event: BluetoothAdvertisingEvent) => void): void;
  removeEventListener(type: 'advertisementreceived', listener: (event: BluetoothAdvertisingEvent) => void): void;
}

declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }
}
