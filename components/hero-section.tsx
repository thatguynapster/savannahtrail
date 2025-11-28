import Image from 'next/image'
import React from 'react'
import BookingForm from './booking-form'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <section className="bg-black/30 h-screen max-h-[calc(100dvh-5rem)] flex">
            <div className="relative w-full isolate overflow-hidden pt-14">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/30">
                    <Image
                        alt="image of savannah trail tour destination (Ghana)"
                        fill
                        src="/img/homepage-hero.jpg"
                        className="absolute inset-0 -z-10 size-full object-cover"
                    />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center h-full">
                        <div className="max-w-2xl text-white">
                            <h1 className="text-3xl font-poppins font-semibold tracking-tight sm:text-7xl">
                                Discover your roots, embrace your heritage
                            </h1>

                            <p className="text-xl font-poppins mt-8">
                                and explore Africa through authentic, immersive cultural experiences. Your journey home begins here
                            </p>

                            {/* <BookingForm /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection