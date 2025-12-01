'use client';

import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';
import { useState } from 'react';

interface HeroSectionProps {
    title: string;
    subHeading?: string
    backgroundImage: string;
}

export function HeroSection({ title, subHeading, backgroundImage }: HeroSectionProps) {
    const [imageError, setImageError] = useState(false);
    const displayImage = imageError ? PLACEHOLDER_IMAGE : backgroundImage;

    return (
        <header className="relative h-64 md:h-80 w-full overflow-hidden" role="banner">
            {/* Background Image */}
            <Image
                src={displayImage}
                alt={`${title} destination background`}
                fill
                priority
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="100vw"
            />

            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-cursive text-center px-4">
                        {title}
                    </h1>
                    {subHeading &&
                        <h2 className="mt-8 text-3xl capitalize">{subHeading}</h2>
                    }
                </div>
            </div>
        </header>
    );
}
