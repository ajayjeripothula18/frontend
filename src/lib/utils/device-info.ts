import { UAParser } from 'ua-parser-js';

export interface DeviceInfo {
  browser: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    type: string;
    vendor: string;
    model: string;
  };
  screen: {
    width: number;
    height: number;
  };
  timezone: string;
  userAgent: string;
}

export const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      browser: { name: 'Unknown', version: 'Unknown' },
      os: { name: 'Unknown', version: 'Unknown' },
      device: { type: 'Unknown', vendor: 'Unknown', model: 'Unknown' },
      screen: { width: 0, height: 0 },
      timezone: 'Unknown',
      userAgent: 'Unknown'
    };
  }

  const parser = new UAParser(window.navigator.userAgent);
  const browserResult = parser.getBrowser();
  const osResult = parser.getOS();
  const deviceResult = parser.getDevice();

  return {
    browser: {
      name: browserResult.name || 'Unknown',
      version: browserResult.version || 'Unknown',
    },
    os: {
      name: osResult.name || 'Unknown',
      version: osResult.version || 'Unknown',
    },
    device: {
      type: deviceResult.type || 'Unknown',
      vendor: deviceResult.vendor || 'Unknown',
      model: deviceResult.model || 'Unknown',
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: window.navigator.userAgent,
  };
}; 