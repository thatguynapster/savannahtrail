'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import { PLACEHOLDER_IMAGE } from '@/lib/utils'

type Props = {}

const Brands = (props: Props) => {
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

    const handleImageError = (imagePath: string) => {
        setFailedImages(prev => new Set(prev).add(imagePath));
    };

    const getImageSrc = (imagePath: string) => {
        return failedImages.has(imagePath) ? PLACEHOLDER_IMAGE : imagePath;
    };

    return (
        <div className="bg-[#f7f7f7] py-10">
            <div
                className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group"
            >
                <ul
                    className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:paused">
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/emirates.png')}
                            alt='Emirates'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/emirates.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/trivago.png')}
                            alt='Trivago'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/trivago.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/airbnb.png')}
                            alt='Airbnb'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/airbnb.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/turkish-airlines.png')}
                            alt='Turkish Airlines'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/turkish-airlines.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/swiss.png')}
                            alt='Swiss'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/swiss.png')}
                            sizes="80px"
                        />
                    </li>
                </ul>
                <ul
                    className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:paused" aria-hidden="true">
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/emirates.png')}
                            alt='Emirates'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/emirates.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/trivago.png')}
                            alt='Trivago'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/trivago.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/airbnb.png')}
                            alt='Airbnb'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/airbnb.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/turkish-airlines.png')}
                            alt='Turkish Airlines'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/turkish-airlines.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/swiss.png')}
                            alt='Swiss'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/swiss.png')}
                            sizes="80px"
                        />
                    </li>
                </ul>
                <ul
                    className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:paused" aria-hidden="true">
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/emirates.png')}
                            alt='Emirates'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/emirates.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/trivago.png')}
                            alt='Trivago'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/trivago.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/airbnb.png')}
                            alt='Airbnb'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/airbnb.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/turkish-airlines.png')}
                            alt='Turkish Airlines'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/turkish-airlines.png')}
                            sizes="80px"
                        />
                    </li>
                    <li className="relative w-20 h-[25px]">
                        <Image
                            src={getImageSrc('/img/swiss.png')}
                            alt='Swiss'
                            fill
                            loading="lazy"
                            onError={() => handleImageError('/img/swiss.png')}
                            sizes="80px"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Brands
