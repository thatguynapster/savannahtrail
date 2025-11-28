import { notFound } from "next/navigation";

import PackageBookingForm from "@/components/package-booking-form";
import { getTourPackage } from "@/lib/actions/packages";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function BookPackagePage({ params }: PageProps) {
    const { responses: pkg } = await getTourPackage(params.id);
    console.log("Tour Package:", pkg);

    if (!pkg) {
        notFound();
    }


    return (
        // <div className="min-h-screen py-20 bg-gray-50">
        //     <div className="container mx-auto px-4">
        //         <div className="max-w-4xl mx-auto">
        //             <div className="text-center mb-8">
        //                 <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Tour</h1>
        //                 <p className="text-gray-600">Complete your booking for {pkg.title}</p>
        //             </div>

        //             <PackageBookingForm package={pkg} />
        //         </div>
        //     </div>
        // </div>

        <div className="min-h-screen">
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/img/about-banner.png')" }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-2">Book Your Tour</h1>
                        <p className="">Complete your booking for <strong>{pkg.title}</strong></p>
                    </div>
                </div>
            </div>

            <section className="py-20 overflow-x-clip">
                <div className="container max-w-4xl  mx-auto px-4">
                    {/* <div className="flex flex-col md:flex-row gap-12 items-center"> */}
                    <PackageBookingForm package={pkg} />
                    {/* </div> */}
                </div>
            </section>

        </div>
    );
}
