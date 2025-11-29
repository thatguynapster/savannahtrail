'use client';

import { formatTime } from '@/lib/utils';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface ItineraryDetailsProps {
    destination?: string;
    departureTime?: string;
    returnTime?: string;
}

export function ItineraryDetails({
    destination,
    departureTime,
    returnTime
}: ItineraryDetailsProps) {
    // Check if we have any data to display
    const hasAnyData = destination || departureTime || returnTime;

    // If no data at all, don't render the section
    if (!hasAnyData) {
        return null;
    }

    return (
        <section id="tour-plan" className="py-8">
            <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Tour Plan</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Destination */}
                    {destination && (
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Destination
                                </h3>
                                <p className="text-gray-700">{destination}</p>
                            </div>
                        </div>
                    )}

                    {/* Departure Time */}
                    {departureTime && (
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Departure Time
                                </h3>
                                <p className="text-gray-700">{formatTime(departureTime)}</p>
                            </div>
                        </div>
                    )}

                    {/* Return Time */}
                    {returnTime && (
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Return Time
                                </h3>
                                <p className="text-gray-700">{formatTime(returnTime)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
