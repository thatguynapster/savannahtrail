'use client';

import { Check, X } from 'lucide-react';

interface IncludedServicesProps {
    included: string[];
    notIncluded: string[];
}

interface ServiceListProps {
    title: string;
    items: string[];
    icon: 'check' | 'x';
}

function ServiceList({ title, items, icon }: ServiceListProps) {
    if (!items || items.length === 0) {
        return null;
    }

    const Icon = icon === 'check' ? Check : X;
    const iconColor = icon === 'check' ? 'text-green-600' : 'text-red-600';
    const bgColor = icon === 'check' ? 'bg-green-50' : 'bg-red-50';
    const ariaLabel = icon === 'check' ? 'Included' : 'Not included';

    return (
        <div>
            <h4 className="text-lg font-semibold mb-4">{title}</h4>
            <ul className="space-y-3" aria-label={`${title} services`}>
                {items.map((item, index) => (
                    <li key={index} className={`flex items-start gap-3 p-3 rounded-lg ${bgColor}`}>
                        <Icon
                            className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`}
                            aria-label={ariaLabel}
                        />
                        <span className="text-gray-800">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function IncludedServices({ included, notIncluded }: IncludedServicesProps) {
    // If no services data is provided, don't render the section
    const hasData = (included && included.length > 0) || (notIncluded && notIncluded.length > 0);

    if (!hasData) {
        return null;
    }

    return (
        <section
            id="location"
            className="py-8"
            role="tabpanel"
            aria-labelledby="location-tab"
        >
            <h3 className="text-2xl font-bold mb-6">What&apos;s Included</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceList
                    title="Included"
                    items={included || []}
                    icon="check"
                />

                <ServiceList
                    title="Not Included"
                    items={notIncluded || []}
                    icon="x"
                />
            </div>
        </section>
    );
}
