import { DateTimeString } from './common';
import { LEAD_STATUSES, LEAD_SOURCES } from '@/lib/constants';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST' | 'ARCHIVED';
export type LeadSource = 'EMAIL' | 'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'PHONE' | 'OTHER';

export enum LeadActivityType {
  CREATED = 'Created',
  STATUS_UPDATED = 'Status Updated',
  UPDATED = 'Updated',
  ASSIGNED = 'Assigned',
  NOTE_ADDED = 'NOTE_ADDED',
  ARCHIVED = 'Archived',
  DELETED = 'DELETED',
  SCORED = 'SCORED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'Converted',
  MERGED = 'Merged',
  ESCALATED = 'Escalated'
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  value?: number;
  assignedTo?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: number;
  leadId: number;
  userId: number;
  type: LeadActivityType;
  description: string;
  createdAt: string;
  user: {
    userId: number;
    name: string;
    email: string;
  };
}

export interface CreateLeadDTO {
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
  NEW: ['CONTACTED', 'ARCHIVED'],
  CONTACTED: ['QUALIFIED', 'LOST', 'ARCHIVED'],
  QUALIFIED: ['PROPOSAL', 'LOST', 'ARCHIVED'],
  PROPOSAL: ['NEGOTIATION', 'LOST', 'ARCHIVED'],
  NEGOTIATION: ['WON', 'LOST', 'ARCHIVED'],
  WON: ['ARCHIVED'],
  LOST: ['ARCHIVED'],
  ARCHIVED: []
};

export interface LeadsResponse {
  leads: Lead[];
  totalPages: number;
  currentPage: number;
}

export interface LeadResponse {
  leadId: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  assignedAgent?: {
    userId: number;
    name: string;
    email: string;
  };
  potentialValue?: number;
  createdAt: string;
  updatedAt: string;
}