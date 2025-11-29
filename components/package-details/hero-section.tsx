'use client';

import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';
import { useState } from 'react';

interface HeroSectionProps {
    title: string;
    backgroundImage: string;
}

export function HeroSection({ title, backgroundImage }: HeroSectionProps) {
    const [imageError, setImageError] = useState(false);
    const displayImage = imageError ? PLACEHOLDER_IMAGE : backgroundImage;

    return (
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src={displayImage}
                alt={title}
                fill
                priority
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="100vw"
            />

            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-cursive text-center px-4">
                    {title}
                </h1>
            </div>
        </div>
    );
}
