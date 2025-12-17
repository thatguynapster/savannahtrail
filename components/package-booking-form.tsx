'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from "react-hook-form";
import Image from 'next/image';
import { z } from 'zod';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package } from '@/types/package';
import { BookingCreateRequest, BookingCreateResponse } from '@/types/booking';
import { bookingsApi } from '@/lib/api/bookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CalendarIcon, Users, Clock, DollarSign, Currency } from 'lucide-react';
import { format } from 'date-fns';
import { cn, formatPrice } from '@/lib/utils';
import { PhoneInput } from "./ui/phone-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { sanitizeFormData, isValidEmail, isValidPhone, RateLimiter } from '@/lib/security';

interface PackageBookingFormProps {
    package: Package;
}

const bookingSchema = z.object({
    package_id: z.string().min(1, 'Package is required'),
    guest_name: z.string().min(1, 'Guest name is required'),
    guest_phone: z.string().min(1, 'Guest phone is required'),
    guest_email: z.string().email('Invalid email address'),
    guest_limit: z.number().min(1, 'At least 1 guest is required'),
    tour_date: z.date({
        required_error: 'Tour date is required',
    }),
    addons: z.array(z.object({
        name: z.string(),
        price: z.number().min(0),
    })).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function PackageBookingForm({ package: pkg }: PackageBookingFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // Rate limiting for form submissions
    const rateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            package_id: pkg._id,
            guest_name: '',
            guest_phone: '',
            guest_email: '',
            guest_limit: 1,
            addons: [],
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    const { fields: addonFields, append: appendAddon, remove: removeAddon } = useFieldArray({
        control: form.control,
        name: 'addons',
    });

    const calculateTotal = () => {
        const guestLimit = form.watch('guest_limit') || 1;
        const selectedAddons = form.watch('addons') || [];

        const basePrice = pkg.base_price * guestLimit;
        const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

        return basePrice + addonsPrice;
    };

    const handleSubmit = async (data: BookingFormData) => {
        setError(null);

        // Rate limiting check
        const clientId = `booking_${Date.now()}`;
        if (!rateLimiter.isAllowed(clientId)) {
            setError('Too many submission attempts. Please wait a moment before trying again.');
            return;
        }

        // Additional validation
        if (!isValidEmail(data.guest_email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isValidPhone(data.guest_phone)) {
            setError('Please enter a valid phone number.');
            return;
        }

        // Sanitize form data
        const sanitizedData = sanitizeFormData(data as any) as BookingFormData;
        console.log('Booking Data:', sanitizedData);

        try {
            const bookingData: BookingCreateRequest = {
                package_id: sanitizedData.package_id,
                guest_name: sanitizedData.guest_name,
                guest_phone: sanitizedData.guest_phone,
                guest_email: sanitizedData.guest_email,
                tour_date: sanitizedData.tour_date,
                num_guests: sanitizedData.guest_limit,
                addons: sanitizedData.addons || [],
                redirect_url: window.location.origin + '/packages',
            };

            const response = await bookingsApi.createBooking(bookingData);

            if (response.success && response.responses) {
                const bookingResponse = response.responses;

                // Show success notification
                toast.success('Booking created successfully!', {
                    description: 'Redirecting you to the payment page...',
                    duration: 3000,
                });

                // Check if payment URL exists
                // if (bookingResponse.invoice?.paystack_authorization_url) {
                // Open payment page in new tab after a short delay
                setTimeout(() => {
                    window.open(bookingResponse.invoice.paystack_authorization_url, '_blank');
                }, 1500);
                // } else {
                //     // Fallback: redirect to booking confirmation
                //     setTimeout(() => {
                //         router.push(`/packages/${pkg._id}/book?success=true`);
                //     }, 2000);
                // }

                form.reset();
            } else {
                setError('Failed to create booking. Please try again.');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setError('An error occurred while creating your booking. Please try again.');
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-white">
                <CardTitle className="text-2xl">Book This Tour</CardTitle>
                <CardDescription className="text-gray-100">
                    Fill in your details to reserve your spot
                </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                {/* Package Summary */}
                <div className="bg-gray-50 py-4 rounded-lg mb-6">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">{pkg.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{pkg.duration_hours} hours</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>Up to {pkg.guest_limit} guests</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Currency className="w-4 h-4" />
                                <span>{formatPrice(pkg.base_price, true)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Guest Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Guest Information</h3>

                            <div className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="guest_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='space-y-2 items-center justify-between'>
                                                <FormLabel className='capitalize'>name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Kwaku Mensah"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="guest_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='space-y-2 items-center justify-between'>
                                                <FormLabel className='capitalize'>email *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., kwaku@kmensah.com"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="guest_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='space-y-2 items-center justify-between'>
                                                <FormLabel className='capitalize'>Phone Number *</FormLabel>
                                                <FormControl>
                                                    <PhoneInput
                                                        defaultCountry="GH"
                                                        placeholder="020 123 4567"
                                                        className="w-full"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="guest_limit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='space-y-2 items-center justify-between'>
                                                <FormLabel className='capitalize'>Number of Guests *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        min="1"
                                                        max={pkg.guest_limit}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Tour Date */}
                        <FormField
                            control={form.control}
                            name="tour_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Date *</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : "Select tour date"}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => {
                                                    // Only disable past dates
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);

                                                    if (date < today) {
                                                        return true;
                                                    }

                                                    // If there are no available dates, allow all future dates
                                                    if (!pkg.available_dates || pkg.available_dates.length === 0) {
                                                        return false;
                                                    }

                                                    // If there are available dates, only allow those dates
                                                    return !pkg.available_dates.some(availableDate =>
                                                        format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                                                    );
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Add-ons */}
                        {pkg.addons.length > 0 && (
                            // <div className="space-y-4">
                            //     <h3 className="text-lg font-semibold text-gray-900"> Optional extras for this package</h3>
                            //     <div className="space-y-3">
                            //         {pkg.addons.map((addon) => (
                            //             <div key={addon.name} className="flex items-center justify-between p-3 border rounded-lg">
                            //                 <div className="flex items-center space-x-3">
                            //                     <Checkbox
                            //                         id={addon.name}
                            //                         checked={selectedAddons.includes(addon.name)}
                            //                         onCheckedChange={(checked) => handleAddonChange(addon.name, checked as boolean)}
                            //                     />
                            //                     <Label htmlFor={addon.name} className="font-medium">
                            //                         {addon.name}
                            //                     </Label>
                            //                 </div>
                            //                 <span className="font-semibold text-primary">${addon.price}</span>
                            //             </div>
                            //         ))}
                            //     </div>
                            // </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add-ons</CardTitle>
                                    <CardDescription>
                                        Optional extras for this package
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {pkg.addons.map((addon) => {
                                        const selectedAddOn = addonFields.find(a => a.name === addon.name);

                                        return <div key={addon.name} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id={addon.name}
                                                    checked={selectedAddOn !== undefined}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            // Add addon when checked
                                                            appendAddon(addon);
                                                        } else {
                                                            // Remove addon when unchecked
                                                            const index = addonFields.findIndex(a => a.name === addon.name);
                                                            if (index !== -1) {
                                                                removeAddon(index);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={addon.name} className="font-medium">
                                                    {addon.name}
                                                </Label>
                                            </div>
                                            <span className="font-semibold text-primary">${addon.price}</span>
                                        </div>
                                    })}
                                </CardContent>
                            </Card>
                        )}

                        <Separator />

                        {/* Total and Submit */}
                        <div className="">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold">Total Amount:</span>
                                <span className="text-2xl font-bold text-primary">${calculateTotal()}</span>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                                size="lg"
                            >
                                {isSubmitting ? 'Creating Booking...' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
