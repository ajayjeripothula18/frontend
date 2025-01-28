import { Activity as CommonActivity, PaginationResponse } from './common';

export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface Customer {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  assignedAgentId: string;
  notes: string;
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  activityId: string;
  type: ActivityType;
  details: string;
  createdAt: string;
}

export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'OTHER';

export interface CustomersResponse extends PaginationResponse {
  customers: Customer[];
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  assignedAgentId?: string;
  notes?: string;
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {}