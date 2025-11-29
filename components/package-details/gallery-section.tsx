'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';

interface GallerySectionProps {
    images: string[];
    title: string;
}

export function GallerySection({ images, title }: GallerySectionProps) {
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

    const handleImageError = (index: number) => {
        setFailedImages(prev => new Set(prev).add(index));
    };

    // If no images, don't render the section
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="py-8">
            <h3 className="text-2xl font-bold mb-6">From our gallery</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => {
                    const displayImage = failedImages.has(index) ? PLACEHOLDER_IMAGE : image;

                    return (
                        <div
                            key={index}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
                        >
                            <Image
                                src={displayImage}
                                alt={`${title} - Image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                onError={() => handleImageError(index)}
                                sizes="(max-width: 768px) 50vw, 33vw"
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
