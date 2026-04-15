'use client';

import { useRef, useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { HeroSection } from '@/components/package-details/hero-section';
import { NavigationTabs, TabType } from '@/components/package-details/navigation-tabs';
import { IncludedServices } from '@/components/package-details/included-services';
import { GallerySection } from '@/components/package-details/gallery-section';
import { Check, X, MapPin, Clock, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { PhoneInput } from '@/components/ui/phone-input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ITINERARY = [
    {
        day: '01',
        title: 'Aburi Heights',
        subtitle: 'Accra → Botanical Gardens · Waterfalls · Quad Bikes',
        stops: [
            { time: '08:00', detail: 'Private coach departs Accra. Refreshments on board.' },
            { time: '09:30', detail: 'Arrive Aburi. Check in, light breakfast, day briefing.' },
            { time: '10:30', detail: 'Guided waterfall trek through lush forest trails.' },
            { time: '12:30', detail: 'Cycle the Botanical Gardens (est. 1890) — rare tropical species, sweeping views.' },
            { time: '15:00', detail: 'Lunch — local cuisine at a curated garden-side spot.' },
            { time: '16:30', detail: 'Quad bike adventure — off-road through the hills to a private waterfall.' },
            { time: '19:00', detail: 'Ghanaian Games Night — oware, pilolo, live music, dinner under the stars.' },
        ],
    },
    {
        day: '02',
        title: 'Volta Highlands',
        subtitle: 'Aburi → Hohoe · Afadjato · Wli Falls · The Soirée',
        stops: [
            { time: '06:00', detail: 'Early depart for Volta Region. Breakfast boxes on board.' },
            { time: '11:00', detail: 'Afadjato — choose your path: guided summit (885m, views into Togo) or Hohoe market immersion.' },
            { time: '14:30', detail: 'Regroup and shared lunch.' },
            { time: '15:30', detail: 'Wli Waterfalls — West Africa\'s highest waterfall. Accessible to all.' },
            { time: '18:00', detail: 'Return to Hohoe. Dinner and rest.' },
            { time: '21:00', detail: 'The Mystery Soirée — cryptic hints lead to a secret open-air party. Location undisclosed. This season: Murder Mystery.' },
        ],
    },
    {
        day: '03',
        title: 'Accra Homecoming',
        subtitle: 'Hohoe → Makola Market · Nkrumah Memorial · Club Night',
        stops: [
            { time: '10:00', detail: 'Late checkout. Leisurely morning before boarding the coach.' },
            { time: '15:00', detail: 'Arrive Accra. Freshen up.' },
            { time: '15:30', detail: 'Makola Market — fabrics, spices, crafts, and city energy. Your guide navigates, you discover.' },
            { time: '17:00', detail: 'Kwame Nkrumah Memorial Park — mausoleum, museum, essential history.' },
            { time: '18:30', detail: 'Hotel drop-off to freshen up.' },
            { time: '21:00', detail: 'Club Night — VIP table at one of Accra\'s finest venues. Music, dancing, the final toast.' },
        ],
    },
];

const INCLUDED = [
    'Private coach transfers throughout',
    'All guided activities and entrance fees',
    'Meals as listed in itinerary',
    'Games Night and dinner party',
    'The Soirée — signature surprise party',
    'VIP table at Accra club night',
];

const NOT_INCLUDED = [
    'International flights and visas',
    'Personal travel insurance',
    'Alcoholic beverages (unless listed)',
    'Personal market shopping',
    'Guide gratuities (discretionary)',
];

const GALLERY_IMAGES = [
    '/img/guided-tours.png',
    '/img/bg-tour-package.png',
    '/img/religious-tours.png',
    '/img/santorini.jpg',
    '/img/swiss.png',
    '/img/about-destination.jpg',
];

export default function GhanaDiscoveryPage() {
    const [activeTab, setActiveTab] = useState<TabType>('information');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1200);
    };

    return (
        <>
            <main className="min-h-screen">
                <HeroSection
                    title="Ghana Discovery"
                    subHeading="Culture · Adventure · Unforgettable Nights"
                    backgroundImage="/img/about-destination.jpg"
                />

                <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column */}
                        <article className="lg:col-span-2 space-y-8">

                            {/* Information */}
                            <section id="information" className="py-8" role="tabpanel" aria-labelledby="information-tab">
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <h2 className="text-3xl md:text-4xl font-bold">Ghana Discovery Experience</h2>
                                        <div className="text-right">
                                            {/* <p className="text-3xl font-bold text-primary">Contact for Pricing</p> */}
                                            <div className="flex items-center gap-1 text-gray-600 mt-1 justify-end">
                                                <Clock className="w-4 h-4" aria-hidden="true" />
                                                <span className="text-sm">3 Days · 2 Nights</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick facts */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { icon: Calendar, label: 'Duration', value: '3 Days · 2 Nights' },
                                            { icon: MapPin, label: 'Locations', value: 'Aburi · Volta · Accra' },
                                            { icon: Users, label: 'Group Size', value: 'Small Group' },
                                            { icon: Check, label: 'Activities', value: 'All Included' },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">{label}</p>
                                                    <p className="text-sm font-semibold text-gray-800">{value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 leading-relaxed">
                                            Three days. One unforgettable Ghana. From the lush forest trails of Aburi to the misty heights of Afadjato and the electric pulse of Accra&apos;s nightlife, the Ghana Discovery Experience takes you through the heart of what makes this country extraordinary. Trek to waterfalls, cycle through century-old botanical gardens, summit West Africa&apos;s highest peak, and lose yourself in the colour and chaos of Makola Market — all with a small group, expert guides, and every detail taken care of. Evenings bring their own magic: a games night under the stars, a mystery soirée with a location revealed only on the night, and a VIP send-off at one of Accra&apos;s finest venues. This isn&apos;t a tour. It&apos;s Ghana, lived.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Itinerary */}
                            <section id="tour-plan" className="py-8" role="tabpanel" aria-labelledby="tour-plan-tab">
                                <h2 className="text-2xl md:text-3xl font-bold mb-8">The Journey</h2>
                                <div className="space-y-8">
                                    {ITINERARY.map((day) => (
                                        <div key={day.day} className="relative pl-6 border-l-2 border-primary/20">
                                            <div className="absolute -left-4 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {day.day}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                                                <p className="text-sm text-primary font-medium mb-4">{day.subtitle}</p>
                                                <ul className="space-y-3">
                                                    {day.stops.map((stop) => (
                                                        <li key={stop.time} className="flex gap-4">
                                                            <span className="text-sm font-mono font-semibold text-gray-500 w-12 flex-shrink-0 pt-0.5">{stop.time}</span>
                                                            <span className="text-gray-700 text-sm leading-relaxed">{stop.detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Included Services */}
                            <IncludedServices included={INCLUDED} notIncluded={NOT_INCLUDED} />

                            {/* Gallery */}
                            <GallerySection images={GALLERY_IMAGES} title="Ghana Discovery" />
                        </article>

                        {/* Right Column — Booking Form */}
                        <aside className="lg:col-span-1" aria-label="Booking form">
                            <div className="lg:sticky lg:top-24">
                                <Card className="overflow-hidden">
                                    <CardHeader className="bg-primary text-white">
                                        <CardTitle className="text-2xl">Reserve Your Place</CardTitle>
                                        <CardDescription className="text-gray-100">
                                            Complete the form and our team will confirm your place within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        {submitted ? (
                                            <div className="text-center py-8 space-y-3">
                                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Check className="w-7 h-7 text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">You&apos;re on your way to Ghana.</h3>
                                                <p className="text-gray-600 text-sm">We&apos;ve received your request and will be in touch within 24 hours.</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleBookingSubmit} className="space-y-5">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="first_name">First Name *</Label>
                                                        <Input id="first_name" placeholder="Kwaku" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="last_name">Last Name *</Label>
                                                        <Input id="last_name" placeholder="Mensah" required />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address *</Label>
                                                    <Input id="email" type="email" placeholder="kwaku@example.com" required />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number *</Label>
                                                    <PhoneInput
                                                        defaultCountry="GH"
                                                        placeholder="020 123 4567"
                                                        className="w-full"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="travellers">Number of Travellers *</Label>
                                                    <Select required>
                                                        <SelectTrigger id="travellers">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">1 traveller</SelectItem>
                                                            <SelectItem value="2">2 travellers</SelectItem>
                                                            <SelectItem value="3">3 travellers</SelectItem>
                                                            <SelectItem value="4">4 travellers</SelectItem>
                                                            <SelectItem value="5+">5+ travellers — we&apos;ll be in touch</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="payment">Preferred Payment Method *</Label>
                                                    <Select required>
                                                        <SelectTrigger id="payment">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="bank">Bank Transfer</SelectItem>
                                                            <SelectItem value="card">Card</SelectItem>
                                                            <SelectItem value="momo">Mobile Money</SelectItem>
                                                            <SelectItem value="paypal">PayPal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="notes">Dietary requirements or notes</Label>
                                                    <Textarea id="notes" placeholder="Any dietary requirements or special requests..." rows={3} />
                                                </div>

                                                <Separator />

                                                <p className="text-xs text-gray-500">
                                                    By submitting this form you agree to our booking terms. A member of our team will reach out within 24 hours to confirm your place. Spaces are limited.
                                                </p>

                                                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                                                    {submitting ? 'Submitting...' : 'Submit Booking Request'}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
        </>
    );
}
