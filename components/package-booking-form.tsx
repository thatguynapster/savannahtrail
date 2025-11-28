'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from "react-hook-form";
import Image from 'next/image';
import { z } from 'zod';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package } from '@/types/package';
import { BookingCreateRequest } from '@/types/booking';
import { bookingsApi } from '@/lib/api/bookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CalendarIcon, Users, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PhoneInput } from "./ui/phone-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface PackageBookingFormProps {
    package: Package;
}

const bookingSchema = z.object({
    package_id: z.string().min(1, 'Package is required'),
    guest_name: z.string().min(1, 'Guest name is required'),
    guest_phone: z.string().min(1, 'Guest phone is required'),
    guest_email: z.string().email('Invalid email address'),
    guest_limit: z.number().min(1, 'At least 1 guest is required'),
    tour_date: z.date(),
    // guide_id: z.string().optional(),
    addons: z.array(z.object({
        name: z.string(),
        price: z.number().min(0),
    })).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function PackageBookingForm({ package: pkg }: PackageBookingFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

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
        // const basePrice = pkg.base_price * formData.num_guests;
        // const addonsPrice = pkg.addons
        //     .filter(addon => selectedAddons.includes(addon.name))
        //     .reduce((sum, addon) => sum + addon.price, 0);
        // return basePrice + addonsPrice;
        return 0
    };

    const handleSubmit = async (data: BookingFormData) => {
        setError(null);
        console.log('Booking Data:', data);

        try {
            // const bookingData: BookingCreateRequest = {
            //     package_id: pkg._id,
            //     guest_name: formData.guest_name,
            //     guest_phone: formData.guest_phone,
            //     guest_email: formData.guest_email,
            //     tour_date: tourDate,
            //     num_guests: formData.num_guests,
            //     addons: pkg.addons.filter(addon => selectedAddons.includes(addon.name)),
            //     redirect_url: formData.redirect_url,
            // };

            // const response = await bookingsApi.createBooking(bookingData);

            // if (response.success) {
            //     // Redirect to success page or booking confirmation
            //     router.push(`/booking/${response.responses._id}`);
            // } else {
            //     setError('Failed to create booking. Please try again.');
            // }
        } catch (err) {
            console.error('Booking error:', err);
            setError('An error occurred while creating your booking. Please try again.');
        }
    };

    const tourDate = form.watch('tour_date');

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Package Summary */}
            <div className="bg-gray-50 p-6 border-b">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image
                                src={pkg.images.length ? pkg.images[0] : '/file.svg'}
                                alt={pkg.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h2>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{pkg.duration_hours} hours</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>Up to {pkg.guest_limit} guests</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${pkg.base_price} per person</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Guest Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Guest Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                        <Label>Tour Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !tourDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {tourDate ? format(tourDate, "PPP") : "Select tour date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={tourDate}
                                    onSelect={(date) => form.setValue('tour_date', date!)}
                                    disabled={(date) => date < new Date() || !pkg.available_dates.some(availableDate =>
                                        format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                                    )}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

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
                                                    console.log(addonFields);
                                                    console.log('Addon checked change:', addon.name, checked);
                                                    if (checked) removeAddon(addonFields.findIndex(a => a.name === addon.name));
                                                    else appendAddon(addon);
                                                    // handleAddonChange(addon.name, checked as boolean)
                                                    console.log(addonFields);
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
        </div>
    );
}
