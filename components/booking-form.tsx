import React, { useState } from 'react'
import clsx from 'clsx';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from './ui/label';

type Props = {}
type FormData = {
    destination?: string
    travelType?: string
}

const BookingForm = (props: Props) => {
    const [data, setData] = useState<FormData>({})
    return (
        // <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/70 w-full">

                <div className={clsx('group relative flex items-center transition-colors px-4')} >
                    <Input name="destination" className='caret-white' value={''} onChange={(e) => { }} />
                    <Label
                        htmlFor="destination"
                        className='text-white px-4'
                    // inputValue={data.destination}
                    > Where To? </Label>
                </div>

                <Select>
                    <SelectTrigger className="border-0 shadow-none focus:ring-0 text-white !px-4">
                        <SelectValue placeholder="Destination" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paris">Paris</SelectItem>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="tokyo">Tokyo</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="border-0 shadow-none focus:ring-0 text-white !px-4">
                        <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paris">5 days</SelectItem>
                        <SelectItem value="london">10 days</SelectItem>
                        <SelectItem value="tokyo">Custom</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <Button variant={'primary'} className="text-sm/6 font-semibold text-white px-8">
                Submit
            </Button>
        </div>
    )
}

export default BookingForm