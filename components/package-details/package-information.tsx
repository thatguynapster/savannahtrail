'use client';

import { formatPrice } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface PackageInformationProps {
    title: string;
    price: number;
    description: string;
    duration: number;
}

export function PackageInformation({
    title,
    price,
    description,
    duration
}: PackageInformationProps) {
    return (
        <section
            id="information"
            className="py-8"
            role="tabpanel"
            aria-labelledby="information-tab"
        >
            <div className="space-y-6">
                {/* Title and Price */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-primary" aria-label={`Price: ${formatPrice(price, false)}`}>
                            {formatPrice(price, true)}
                        </p>
                        <div className="flex items-center gap-1 text-gray-600 mt-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            <span className="text-sm" aria-label={`Duration: ${duration} hours`}>
                                {duration} hours
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                    <h3 className="sr-only">Package Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
