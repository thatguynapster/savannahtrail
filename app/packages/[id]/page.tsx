'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Package } from '@/types/package';
import { packagesApi } from '@/lib/api/packages';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { HeroSection } from '@/components/package-details/hero-section';
import { NavigationTabs, TabType } from '@/components/package-details/navigation-tabs';
import { PackageInformation } from '@/components/package-details/package-information';
import { ItineraryDetails } from '@/components/package-details/itinerary-details';
import { IncludedServices } from '@/components/package-details/included-services';
import { GallerySection } from '@/components/package-details/gallery-section';
import PackageBookingForm from '@/components/package-booking-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface PageState {
    package: Package | null;
    loading: boolean;
    error: string | null;
}

export default function PackageDetailsPage() {
    const params = useParams();
    const packageId = params.id as string;

    const [state, setState] = useState<PageState>({
        package: null,
        loading: true,
        error: null,
    });

    const [activeTab, setActiveTab] = useState<TabType>('information');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchPackage = async () => {
            if (!packageId) {
                setState({
                    package: null,
                    loading: false,
                    error: 'Package ID is missing',
                });
                return;
            }

            try {
                setState(prev => ({ ...prev, loading: true, error: null }));
                const response = await packagesApi.getPackage(packageId);

                if (response.success && response.responses) {
                    setState({
                        package: response.responses,
                        loading: false,
                        error: null,
                    });
                } else {
                    setState({
                        package: null,
                        loading: false,
                        error: 'Package not found',
                    });
                }
            } catch (error) {
                console.error('Error fetching package:', error);

                // Determine error type
                let errorMessage = 'An error occurred while loading the package. Please try again later.';

                if (error instanceof Error) {
                    if (error.message.includes('404') || error.message.includes('not found')) {
                        errorMessage = 'Package not found';
                    } else if (error.message.includes('network') || error.message.includes('fetch')) {
                        errorMessage = 'Unable to load package details. Please check your connection.';
                    }
                }

                setState({
                    package: null,
                    loading: false,
                    error: errorMessage,
                });
            }
        };

        fetchPackage();
    }, [packageId]);

    // Set up Intersection Observer for active tab detection
    useEffect(() => {
        // Only set up observer after package is loaded
        if (state.loading || !state.package) {
            return;
        }

        const sections = ['information', 'tour-plan', 'location', 'gallery'] as TabType[];

        // Create a map to track which sections are currently intersecting
        const intersectingMap = new Map<TabType, boolean>();

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                const sectionId = entry.target.id as TabType;
                intersectingMap.set(sectionId, entry.isIntersecting);
            });

            // Find the first intersecting section in order
            const firstIntersecting = sections.find(id => intersectingMap.get(id));

            if (firstIntersecting) {
                setActiveTab(firstIntersecting);
            }
        };

        // Create observer with threshold and rootMargin for better detection
        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '-100px 0px -50% 0px', // Trigger when section is near top
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        // Observe all sections
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [state.loading, state.package]);

    const handleRetry = () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        // Trigger re-fetch by updating a dependency
        window.location.reload();
    };

    // Loading state
    if (state.loading) {
        return (
            <>
                <main className="min-h-screen">
                    {/* Hero Skeleton */}
                    <Skeleton className="h-[400px] md:h-[500px] w-full rounded-none" />

                    {/* Tabs Skeleton */}
                    <div className="border-b border-gray-200 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="flex space-x-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-12 w-32" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <Skeleton className="h-64 w-full" />
                                <Skeleton className="h-48 w-full" />
                                <Skeleton className="h-96 w-full" />
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-1">
                                <Skeleton className="h-[600px] w-full" />
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    // Error state
    if (state.error || !state.package) {
        return (
            <>
                <main className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {state.error === 'Package not found' ? 'Package Not Found' : 'Oops! Something Went Wrong'}
                            </h2>

                            <p className="text-gray-600 mb-6">
                                {state.error}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                {state.error !== 'Package not found' && (
                                    <Button onClick={handleRetry} variant="primary">
                                        Try Again
                                    </Button>
                                )}

                                <Link href="/packages">
                                    <Button variant={state.error === 'Package not found' ? 'primary' : 'outline'}>
                                        Back to Packages
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    const pkg = state.package;

    return (
        <>
            <main className="min-h-screen">
                {/* Hero Section */}
                <HeroSection
                    title={pkg.destination || pkg.title}
                    backgroundImage={pkg.images[0] || '/img/homepage-hero.jpg'}
                />

                {/* Navigation Tabs */}
                <NavigationTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Package Details */}
                        <div className="lg:col-span-2 space-y-8">
                            <PackageInformation
                                title={pkg.title}
                                price={pkg.base_price}
                                description={pkg.description}
                                duration={pkg.duration_hours}
                            />

                            <ItineraryDetails
                                destination={pkg.destination}
                                departureTime={pkg.departure_time}
                                returnTime={pkg.return_time}
                            />

                            <IncludedServices
                                included={pkg.included_services || []}
                                notIncluded={pkg.excluded_services || []}
                            />

                            <GallerySection
                                images={pkg.images}
                                title={pkg.title}
                            />
                        </div>

                        {/* Right Column - Booking Form */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24">
                                <PackageBookingForm package={pkg} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
