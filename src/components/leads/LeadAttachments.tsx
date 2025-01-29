import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import { toast } from 'sonner';
import { formatDate, formatFileSize } from '@/lib/utils';
import { Download, Trash2, Upload } from 'lucide-react';

interface LeadAttachmentsProps {
  leadId: string;
}

type Attachment = {
  id: number;
  leadId: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: number;
  uploadedAt: string;
  url: string;
};

const ALLOWED_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function LeadAttachments({ leadId }: LeadAttachmentsProps) {
  const queryClient = useQueryClient();

  const { data: attachments, isLoading } = useQuery({
    queryKey: ['lead-attachments', leadId],
    queryFn: () => leadsService.getLeadAttachments(leadId)
  });

  const { mutate: uploadAttachment, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error('Invalid file type. Only Excel and CSV files are allowed.');
      }
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 5MB limit.');
      }
      return leadsService.uploadAttachment(leadId, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead-attachments', leadId] });
      queryClient.invalidateQueries({ queryKey: ['lead-activities', leadId] });
      toast.success('File uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload file');
    }
  });

  const { mutate: deleteAttachment } = useMutation({
    mutationFn: (attachmentId: number) => leadsService.deleteAttachment(leadId, attachmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead-attachments', leadId] });
      toast.success('File deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete file');
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      uploadAttachment(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FileUpload
          accept=".csv,.xls,.xlsx"
          onChange={handleFileUpload}
          disabled={isUploading}
        >
          <Button type="button" disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </FileUpload>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div>Loading attachments...</div>
        ) : attachments?.length === 0 ? (
          <div className="text-gray-500">No attachments yet</div>
        ) : (
          attachments?.map((attachment: Attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {attachment.fileName}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(attachment.fileSize)} • Uploaded on{' '}
                  {formatDate(attachment.uploadedAt, true)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(attachment.url, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAttachment(attachment.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 