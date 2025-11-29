'use client'

import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Package } from '@/types/package';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';

interface PackageCardProps {
    package: Package;
    variant?: 'default' | 'compact';
}

export function PackageCard({ package: pkg, variant = 'default' }: PackageCardProps) {
    const [imageError, setImageError] = useState(false);

    const firstImage = pkg.images && pkg.images.length > 0
        ? pkg.images[0]
        : PLACEHOLDER_IMAGE;

    const displayImage = imageError ? PLACEHOLDER_IMAGE : firstImage;

    const firstAvailableDate = pkg.available_dates && pkg.available_dates.length > 0
        ? new Date(pkg.available_dates[0]).toLocaleDateString('en-GH', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'Date TBD';

    if (variant === 'compact') {
        return (
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm card-hover">
                <div className="relative w-full h-56">
                    <Image
                        src={displayImage}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium z-10">
                        {pkg.duration_hours} hrs
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold">{pkg.title}</h3>
                    </div>

                    <div className="flex items-center text-gray-600 mb-5">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{pkg.guest_limit} guests</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xl font-bold text-primary">${pkg.base_price}</span>
                            <span className="text-gray-500 ml-1">/ person</span>
                        </div>
                        <Link
                            href={`/packages/${pkg._id}/book`}
                            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm transition-colors inline-block"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
            <div className="relative h-56">
                <Image
                    src={displayImage}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-white px-4 py-2 flex items-center gap-2 z-10">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{firstAvailableDate}</span>
                </div>
                <div className="absolute bottom-0 right-0 bg-white text-dark px-4 py-2 flex items-center gap-2 z-10">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{pkg.guest_limit}+ People</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 line-clamp-1">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">{pkg.description}</p>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-xl font-bold">${pkg.base_price.toLocaleString()}</span>
                        <p className="text-gray-500 text-xs mt-1">{pkg.duration_hours} hours</p>
                    </div>
                    <Link
                        href={`/packages/${pkg._id}/book`}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
