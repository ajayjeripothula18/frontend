export const LEAD_SOURCES = [
  'WEBSITE',
  'REFERRAL',
  'SOCIAL_MEDIA',
  'EMAIL',
  'PHONE',
  'OTHER',
] as const;

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
] as const;

export const ACTIVITY_TYPES = [
  'CALL',
  'EMAIL',
  'MEETING',
  'NOTE',
  'OTHER',
] as const;

export const USER_ROLES = [
  'ADMIN',
  'AGENT',
  'MANAGER',
] as const;

export const DATETIME_FORMAT = 'MMM d, yyyy h:mm a';
export const DATE_FORMAT = 'MMM d, yyyy';

export const ITEMS_PER_PAGE = 10;

export const BRAND_COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
  }
};

export const TRANSITIONS = {
  DEFAULT: 'all 0.2s ease-in-out',
  FAST: 'all 0.1s ease-in-out',
  SLOW: 'all 0.3s ease-in-out'
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
};

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Leads', path: '/leads', icon: 'Users' },
  { label: 'Customers', path: '/customers', icon: 'Building' },
  { label: 'Tasks', path: '/tasks', icon: 'CheckSquare' },
  { label: 'Calendar', path: '/calendar', icon: 'Calendar' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
];

export const TASK_PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT',
] as const;

export const TASK_STATUSES = [
  'TODO',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;