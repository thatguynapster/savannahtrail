'use client';

import { Info, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'information' | 'tour-plan' | 'location' | 'gallery';

interface NavigationTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

interface Tab {
    id: TabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
    { id: 'information', label: 'Information', icon: Info },
    // { id: 'tour-plan', label: 'Tour Plan', icon: Calendar },
    // { id: 'location', label: 'Location', icon: MapPin },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
];

// Offset for fixed header (sticky tabs height + some padding)
const SCROLL_OFFSET = 80;

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
    const handleTabClick = (tabId: TabType) => {
        // Update active tab state
        onTabChange(tabId);

        // Scroll to the corresponding section
        const section = document.getElementById(tabId);
        if (section) {
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white sticky top-[60px] z-10">
            <div className="container mx-auto px-4">
                <nav className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap',
                                    isActive
                                        ? 'border-primary text-primary font-medium'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
