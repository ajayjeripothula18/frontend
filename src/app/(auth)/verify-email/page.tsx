import { Metadata } from 'next';
import { EmailVerification } from '@/components/auth/EmailVerification';
import { BrandingSection } from '@/components/auth/BrandingSection';

export const metadata: Metadata = {
    title: 'Verify Email | Hypermiles CRM',
    description: 'Verify your email address for your Hypermiles CRM account.',
};

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function VerifyEmailPage({ searchParams }: Props) {
    const token = searchParams.token as string | undefined;
    const email = searchParams.email as string | undefined;

    return (
        <>
            {/* Left side - Branding */}
            <div className="w-full lg:flex-1 flex justify-center items-center p-8 lg:p-12">
                <BrandingSection />
            </div>

            {/* Right side - Email Verification */}
            <div className="w-full lg:flex-1 flex justify-center items-center p-8 lg:p-12">
                <EmailVerification token={token} email={email} />
            </div>
        </>
    );
} 