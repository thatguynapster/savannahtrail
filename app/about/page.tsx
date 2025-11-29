import { ArrowRight, Award, Clock, ShieldCheck, Users } from 'lucide-react'
import React from 'react'

import { HeroSection } from "@/components/package-details/hero-section"

type Props = {}

const AboutPage = (props: Props) => {
    return (
        <div className="min-h-screen">
            <HeroSection
                title={"About Us"}
                backgroundImage={'/img/about-banner.png'}
            />

            <section className="py-20 overflow-x-clip">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 relative">
                            <img
                                src="/img/about-destination.jpg"
                                alt="Beautiful destination"
                                className="rounded-lg shadow-lg w-full"
                            />

                            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-lg w-56">
                                <h3 className="text-xl font-semibold mb-1">10+ Years</h3>
                                <p className="text-gray-600">Of Travel Experience</p>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <h3 className="section-subtitle">INTRODUCTION</h3>
                            <h2 className="section-title">Connecting your heritage across borders.</h2>
                            <p className="mb-6 text-gray-600">
                                Savannah Trail is a cultural travel brand under Nyansapo Exploration Limited, dedicated to reconnecting the African diaspora with their heritage. Through immersive tours, educational programs, and community partnerships, we offer meaningful experiences that celebrate African's rich history, traditions, and spirit.
                            </p>
                            <p className="mb-8 text-gray-600">
                                Our mission is to empower diasporans and cultural seekers to explore their roots, deepen their identity, and contribute to heritage preservation. With warmth, authenticity, and respect, we create journeys that don't just visit — they transform.
                            </p>
                            {/* <button className="btn-primary flex items-center">
                                Read More <ArrowRight className="ml-2 w-5 h-5" />
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="section-subtitle">TRENDS</h3>
                        <h2 className="section-title">Our Most Popular Experiences</h2>
                        <p className="max-w-3xl mx-auto text-gray-600">
                            Explore our top cultural journeys designed to reconnect, inspire, and celebrate African heritage through immersive storytelling and authentic connections.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="rounded-full bg-white shadow-lg p-8 w-40 h-40 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-primary">82%</span>
                            <span className="text-gray-600 mt-2 uppercase">Cultural Tours</span>
                        </div>

                        <div className="rounded-full bg-white shadow-lg p-8 w-40 h-40 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-primary">64%</span>
                            <span className="text-gray-600 mt-2 uppercase">Community Programs</span>
                        </div>

                        <div className="rounded-full bg-white shadow-lg p-8 w-40 h-40 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-primary">46%</span>
                            <span className="text-gray-600 mt-2 uppercase">Festivals & Events</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="section-subtitle">WHY CHOOSE US</h3>
                        <h2 className="section-title">Why Choose Savannah Trails?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Flexible Payment Options</h3>
                            <p className="text-gray-600">We offer convenient payment plans to make your transformative journey more accessible — without the financial strain.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <Award className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Community-Centered & Authentic</h3>
                            <p className="text-gray-600">We collaborate with local communities to ensure your travel supports heritage preservation and creates lasting impact.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <Clock className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Diaspora-Focused Experiences</h3>
                            <p className="text-gray-600">Our tours are curated for the African diaspora, blending history, culture, and self-discovery in every step.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Deep Cultural Connection</h3>
                            <p className="text-gray-600">Immerse yourself in authentic African experiences designed to reconnect you with your roots and heritage.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage