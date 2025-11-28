'use client'

import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel";

type Props = {}

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "Traveled to Accra, Ghana",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
        text: "Our trip to Accra was absolutely magnificent. The accommodations were perfect, the guides were knowledgeable and friendly, and everything was planned with incredible attention to detail. I'll definitely be booking my next adventure through this platform!"
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Traveled to Kigali, Rwanda",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
        text: "The Rwanda tour exceeded all my expectations! Every detail was perfectly arranged, from the traditional stays to the guided tours of hidden temples. The local food recommendations were outstanding, and the customer service was exceptional when we needed to adjust our itinerary."
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        location: "Traveled to Addis Ababa, Ethiopia",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        text: "Ethiopia was a dream come true! The boutique hotel they booked for us was just exceptional, and our private tour of the city was unforgettable. The restaurant reservations they made for us were at places we never would have found on our own. Simply magical!"
    },
    {
        id: 4,
        name: "David Thompson",
        location: "Traveled to Cape Town, South Africa",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        text: "Our safari and city tour in South Africa was the trip of a lifetime! From the wildlife encounters to the wine tours, everything was planned perfectly. The local guides were incredibly knowledgeable, and the accommodations offered stunning views at every stop. Highly recommended!"
    }
];

const TestimonialsSection = (props: Props) => {

    const [api, setApi] = React.useState<CarouselApi>();

    const handlePrevious = () => {
        if (api) {
            api.scrollPrev();
        }
    };

    const handleNext = () => {
        if (api) {
            api.scrollNext();
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="section-subtitle">TESTIMONIALS</h3>
                    <h2 className="section-title">Hear From Those Who've Reconnected With Their Roots</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <Carousel className="w-full" setApi={setApi}>
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={testimonial.id}>
                                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary">
                                            <img
                                                src={testimonial.image}
                                                alt={`${testimonial.name}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex justify-center mb-4">
                                            {Array(5).fill(0).map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>

                                        <p className="text-gray-600 mb-6 italic">
                                            "{testimonial.text}"
                                        </p>

                                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-500">{testimonial.location}</p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex justify-center mt-8 gap-4">
                            <button
                                onClick={handlePrevious}
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection