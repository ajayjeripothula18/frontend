import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white overflow-hidden rounded-lg border border-gray-200 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('px-4 py-5 sm:px-6 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('px-4 py-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 