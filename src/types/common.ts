// Create a new file for shared types
export type PaginationResponse = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}


export type EntityType = 'LEAD' | 'CUSTOMER';

export interface RelatedEntity {
  type: EntityType;
  id: string;
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

export type DateTimeString = string;

export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'OTHER';

export type Activity = {
  id: string;
  type: string;
  details: string;
  createdAt: DateTimeString;
  createdBy: {
    id: number;
    name: string;
  };
};

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
} 