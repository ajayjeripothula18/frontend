import { Select } from '@/components/ui/Select';
import { LeadStatus, VALID_STATUS_TRANSITIONS } from '@/types/leads';
import { LEAD_STATUSES } from '@/lib/constants';

interface LeadStatusSelectProps {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
  disabled?: boolean;
  error?: string;
}

export function LeadStatusSelect({ value, onChange, disabled, error }: LeadStatusSelectProps) {
  const validNextStatuses = VALID_STATUS_TRANSITIONS[value];

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      disabled={disabled}
      error={error}
      className="w-[200px]"
    >
      {Object.entries(LEAD_STATUSES).map(([status, label]) => (
        <option
          key={status}
          value={status}
          disabled={!validNextStatuses.includes(status as LeadStatus)}
        >
          {label}
        </option>
      ))}
    </Select>
  );
} 