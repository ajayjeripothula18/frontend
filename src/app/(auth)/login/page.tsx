import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import Image from 'next/image';
import HypermilesLogo from '@/assets/images/HypermilesLogoRectangular.png';

export const metadata: Metadata = {
    title: 'Login | HyperMiles CRM',
    description: 'Login to your HyperMiles CRM account',
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen h-screen">
            {/* Left Panel - Brand Section */}
            <div 
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
                style={{ 
                    background: 'linear-gradient(135deg, #0a5486 0%, #065892 100%)'
                }}
            >
                <div className="absolute inset-0" 
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                        backgroundSize: '24px 24px'
                    }}
                />
                <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-6">
                            Welcome to HyperMiles CRM
                        </h1>
                        <div className="h-1 w-20 bg-[#fd9f0d] mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-white/90 mb-4">
                            Streamline your travel business operations with our powerful CRM solution
                        </p>
                        <p className="text-lg font-light text-white/80">
                            Hypermiles TravelTech Pvt Ltd
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-2 gap-8 max-w-lg">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="text-[#fd9f0d] mb-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Secure Access</h3>
                            <p className="text-sm text-white/75 leading-relaxed">
                                Enterprise-grade security with advanced encryption and authentication
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="text-[#fd9f0d] mb-3">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Real-time Updates</h3>
                            <p className="text-sm text-white/75 leading-relaxed">
                                Stay synchronized with instant data updates and notifications
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-12">
                        <Image
                            src={HypermilesLogo}
                            alt="HyperMiles Logo"
                            width={280}
                            height={75}
                            priority
                            className="object-contain"
                        />
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}