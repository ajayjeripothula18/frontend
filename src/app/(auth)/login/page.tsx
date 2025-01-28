import { BrandingSection } from '@/components/auth/BrandingSection';
import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | CRM Portal',
    description: 'Login to your CRM Portal account',
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-primary-100">
                <BrandingSection />
            </div>

            <div className="flex flex-1 items-center justify-center p-8">
                <LoginForm />
            </div>
        </div>
    );
}