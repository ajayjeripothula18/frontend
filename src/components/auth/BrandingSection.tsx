'use client';

import Image from 'next/image';
import HypermilesLogo from '@/assets/images/hypermiles-logo.png';

export function BrandingSection() {
    return (
        <div className="max-w-lg text-center">
            <div className="mb-8">
                <div className="flex justify-center items-center">
                    <div className="relative w-[200px] h-[40px]">
                        <Image
                            src={HypermilesLogo}
                            alt="Hypermiles Logo"
                            fill
                            priority
                            className="object-contain"
                            onError={(e) => {
                                console.error('Image failed to load:', e);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
                <p className="text-lg text-gray-600">
                    Access your dashboard to manage leads, track performance, and grow your business with powerful insights.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-900">Streamlined Workflow</h3>
                        <p className="text-sm text-gray-600">Efficient lead and customer management</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-900">Real-time Analytics</h3>
                        <p className="text-sm text-gray-600">Track performance metrics instantly</p>
                    </div>
                </div>
            </div>
        </div>
    );
}