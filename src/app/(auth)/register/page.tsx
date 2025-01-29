import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { BrandingSection } from '@/components/auth/BrandingSection';

export const metadata: Metadata = {
    title: 'Register | Hypermiles CRM',
    description: 'Create your Hypermiles CRM account to start managing your business efficiently.',
};

export default function RegisterPage() {
    return (
        <>
            {/* Left side - Branding */}
            <div className="w-full lg:flex-1 flex justify-center items-center p-8 lg:p-12">
                <BrandingSection />
            </div>

            {/* Right side - Registration Form */}
            <div className="w-full lg:flex-1 flex justify-center items-center p-8 lg:p-12">
                <RegisterForm />
            </div>
        </>
    );
} 