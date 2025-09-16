import { Platform, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const API_PORT = 5087;

function getDevHostFromBundle(): string | null {
  try {
    const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!scriptURL) return null;
    const { hostname } = new URL(scriptURL);
    return hostname || null;
  } catch {
    return null;
  }
}

export function getBaseURL(): string {
  const isAndroid = Platform.OS === 'android';

  const isEmulator = DeviceInfo.isEmulatorSync?.() ?? false;
  if (isAndroid && isEmulator) {
    return `http://10.0.2.2:${API_PORT}`;
  }

  if (Platform.OS === 'ios' && isEmulator) {
    return `http://localhost:${API_PORT}`;
  }

  const hostFromBundle = getDevHostFromBundle();
  if (hostFromBundle) {
     return `http://localhost:${API_PORT}`;
  }

 
   return `http://localhost:${API_PORT}`;
}
 

export const BASE_URL = getBaseURL();
