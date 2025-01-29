import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication Error - HyperMiles CRM',
  description: 'Authentication error occurred',
}

export default function AuthErrorPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            An error occurred during authentication. Please try again or contact support if the problem persists.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="flex items-center justify-center">
            <a
              href="/login"
              className="text-sm underline hover:text-primary"
            >
              Return to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 