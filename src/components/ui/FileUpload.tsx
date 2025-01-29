'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: React.ReactNode;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ children, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cn('relative', className)}>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {children}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload'; 