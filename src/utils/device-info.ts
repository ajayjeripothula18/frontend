import UAParser from 'ua-parser-js';

export interface DeviceInfo {
  browser: {
    name: string;
    version: string;
    language: string;
  };
  os: {
    name: string;
    version: string;
    platform: string;
  };
  screen: {
    width: number;
    height: number;
  };
  timezone: string;
  userAgent: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const parser = new UAParser();
  const result = parser.getResult();
  
  return {
    browser: {
      name: result.browser.name || 'Unknown',
      version: result.browser.version || 'Unknown',
      language: navigator.language
    },
    os: {
      name: result.os.name || 'Unknown',
      version: result.os.version || 'Unknown',
      platform: result.device.type || 'desktop'
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: navigator.userAgent
  };
}; 