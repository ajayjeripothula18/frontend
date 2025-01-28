import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { LeadActivityType } from '@/types/leads';

interface LeadNotesProps {
  leadId: string;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
}

export function LeadNotes({ leadId }: LeadNotesProps) {
  const [newNote, setNewNote] = useState('');
  const queryClient = useQueryClient();

  const { data: notes, isLoading } = useQuery({
    queryKey: ['lead-notes', leadId],
    queryFn: () => leadsService.getLeadNotes(leadId)
  });

  const { mutate: addNote, isPending } = useMutation({
    mutationFn: (content: string) => leadsService.addLeadNote(leadId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead-notes', leadId] });
      queryClient.invalidateQueries({ queryKey: ['lead-activities', leadId] });
      setNewNote('');
      toast.success('Note added successfully');
    },
    onError: () => {
      toast.error('Failed to add note');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote.trim());
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
          className="w-full"
        />
        <Button type="submit" disabled={isPending || !newNote.trim()}>
          {isPending ? 'Adding...' : 'Add Note'}
        </Button>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <div>Loading notes...</div>
        ) : notes?.length === 0 ? (
          <div className="text-gray-500">No notes yet</div>
        ) : (
          notes?.map((note: Note) => (
            <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">{note.content}</p>
                  <p className="text-xs text-gray-500">
                    By {note.createdBy.name} on {formatDate(note.createdAt, true)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 