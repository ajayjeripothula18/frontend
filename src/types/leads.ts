import { DateTimeString } from './common';
import { LEAD_STATUSES, LEAD_SOURCES } from '@/lib/constants';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
export type LeadSource = 'EMAIL' | 'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'PHONE' | 'OTHER';

export enum LeadActivityType {
  STATUS_CHANGE = 'STATUS_CHANGE',
  NOTE_ADDED = 'NOTE_ADDED',
  EMAIL_SENT = 'EMAIL_SENT',
  CALL_LOGGED = 'CALL_LOGGED',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  ASSIGNED = 'ASSIGNED'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  value?: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: LeadActivityType;
  details: string;
  createdBy: {
    id: number;
    name: string;
  };
  createdAt: DateTimeString;
}

export interface CreateLeadDTO {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  value: number;
}

export interface UpdateLeadDTO extends Partial<CreateLeadDTO> {}

export const VALID_STATUS_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  [LEAD_STATUSES[0]]: [LEAD_STATUSES[1], LEAD_STATUSES[6]],
  [LEAD_STATUSES[1]]: [LEAD_STATUSES[2], LEAD_STATUSES[5], LEAD_STATUSES[6]],
  [LEAD_STATUSES[2]]: [LEAD_STATUSES[3], LEAD_STATUSES[5], LEAD_STATUSES[6]],
  [LEAD_STATUSES[3]]: [LEAD_STATUSES[4], LEAD_STATUSES[5], LEAD_STATUSES[6]],
  [LEAD_STATUSES[4]]: [LEAD_STATUSES[5], LEAD_STATUSES[6]],
  [LEAD_STATUSES[5]]: [LEAD_STATUSES[6]],
  [LEAD_STATUSES[6]]: []
};

export interface LeadsResponse {
  leads: Lead[];
  totalPages: number;
  currentPage: number;
}