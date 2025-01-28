import { LeadStatus } from '@/types/leads';

export const VALID_STATUS_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  NEW: [LeadStatus.CONTACTED, LeadStatus.ARCHIVED],
  CONTACTED: [LeadStatus.QUALIFIED, LeadStatus.LOST, LeadStatus.ARCHIVED],
  QUALIFIED: [LeadStatus.PROPOSAL, LeadStatus.LOST, LeadStatus.ARCHIVED],
  PROPOSAL: [LeadStatus.NEGOTIATION, LeadStatus.LOST, LeadStatus.ARCHIVED],
  NEGOTIATION: [LeadStatus.WON, LeadStatus.LOST, LeadStatus.ARCHIVED],
  WON: [LeadStatus.ARCHIVED],
  LOST: [LeadStatus.ARCHIVED],
  ARCHIVED: []
};

export const LEAD_SOURCES = ['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'DIRECT', 'OTHER'] as const; 