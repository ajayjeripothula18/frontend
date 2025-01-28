export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  LEADS: {
    BASE: '/leads',
    DETAIL: (id: string) => `/leads/${id}`,
    ACTIVITIES: (id: string) => `/leads/${id}/activities`,
    STATUS: (id: string) => `/leads/${id}/status`,
    ARCHIVE: (id: string) => `/leads/${id}/archive`,
    CONVERT: (id: string) => `/leads/${id}/convert`,
    ASSIGN: (id: string) => `/leads/${id}/assign`,
    CUSTOM_FIELDS: {
      BASE: '/leads/custom-fields',
      VALUES: (leadId: string) => `/leads/${leadId}/custom-fields`,
      REACTIVATE: (fieldId: string) => `/leads/custom-fields/${fieldId}/reactivate`
    }
  },
  CUSTOMERS: {
    BASE: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    ACTIVITIES: (id: string) => `/customers/${id}/activities`,
    NOTES: (id: string) => `/customers/${id}/notes`,
    CONTACT: (id: string) => `/customers/${id}/contact`
  },
  TASKS: {
    BASE: '/tasks',
    DETAIL: (id: string) => `/tasks/${id}`,
  },
  CALENDAR: {
    BASE: '/calendar',
    EVENTS: '/calendar/events',
  },
  SETTINGS: {
    BASE: '/settings',
    PROFILE: '/settings/profile',
    PREFERENCES: '/settings/preferences',
  },
}; 