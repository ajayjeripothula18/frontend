'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import HypermilesLogo from '@/assets/images/hypermiles-logo.png';
import { Shield, BarChart2, Users, CheckCircle2 } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade protection for your data'
    },
    {
        icon: BarChart2,
        title: 'Smart Analytics',
        description: 'Real-time insights and reporting'
    },
    {
        icon: Users,
        title: 'Team Management',
        description: 'Collaborate efficiently with your team'
    }
];

export function BrandingSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-white"
        >
            {/* Logo */}
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-12"
            >
                <Image
                    src={HypermilesLogo}
                    alt="Hypermiles Logo"
                    width={240}
                    height={80}
                    className="brightness-0 invert"
                />
            </motion.div>

            {/* Welcome Text */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">
                    Transform Your Business
                </h1>
                <p className="text-lg text-white/80">
                    Access your dashboard to manage leads, track performance, and grow your business with powerful insights.
                </p>
            </motion.div>

            {/* Features */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-6"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                    >
                        <feature.icon className="h-6 w-6 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-white/80">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Trust Badge */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 flex items-center justify-center text-sm text-white/80"
            >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Trusted by leading travel companies worldwide
            </motion.div>
        </motion.div>
    );
}