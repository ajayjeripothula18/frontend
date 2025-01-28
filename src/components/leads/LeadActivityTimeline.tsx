import { formatDistanceToNow } from 'date-fns';
import { LeadActivityType } from '@/types/leads';
import { 
  Clock, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  RefreshCw,
  User
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { LeadActivity } from '@/types/leads';

interface Activity {
  id: string;
  type: LeadActivityType;
  description: string;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
}

interface LeadActivityTimelineProps {
  activities: LeadActivity[];
  isLoading: boolean;
}

const activityIcons = {
  [LeadActivityType.STATUS_CHANGE]: RefreshCw,
  [LeadActivityType.NOTE_ADDED]: MessageSquare,
  [LeadActivityType.EMAIL_SENT]: Mail,
  [LeadActivityType.CALL_LOGGED]: Phone,
  [LeadActivityType.MEETING_SCHEDULED]: Calendar,
  [LeadActivityType.ASSIGNED]: User,
};

export function LeadActivityTimeline({ activities, isLoading }: LeadActivityTimelineProps) {
  if (isLoading) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Activity Timeline</h3>
        </Card.Header>
        <Card.Body>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium">Activity Timeline</h3>
      </Card.Header>
      <Card.Body>
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No activities recorded yet</p>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div className="flex items-center">
                        <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {/* Icon based on activity type */}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div>
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {formatDate(activity.createdAt)}
                          </p>
                        </div>
                        {activity.note && (
                          <div className="mt-2 text-sm text-gray-700">
                            {activity.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
} 