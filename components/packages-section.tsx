import React from 'react'
import { getTourPackages } from "@/lib/actions/packages";
import { PackageCard } from './package-card';

const PackagesSection = async () => {
    const { responses: { docs: packages } } = await getTourPackages({ limit: 6 })

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="section-subtitle">POPULAR</h3>
                    <h2 className="section-title">Our Trending Tour Packages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <PackageCard key={pkg._id} package={pkg} variant="compact" />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PackagesSection