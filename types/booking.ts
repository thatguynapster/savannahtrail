import { Package } from "./package";

export interface Booking {
	_id: string;
	package_id: string;
	package?: Package;
	guest_name: string;
	guest_phone: string;
	guest_email: string;
	tour_date: Date;
	num_guests: number;
	addons: {
		name: string;
		price: number;
	}[];
	redirect_url: string;
	created_at: Date;
	booking_status: "pending" | "confirmed" | "cancelled" | "completed";
	assigned_guide_id: string | null;
	total_amount: number;
}

export interface BookingCreateRequest {
	package_id: string;
	guest_name: string;
	guest_phone: string;
	guest_email: string;
	tour_date: Date;
	num_guests: number;
	addons: {
		name: string;
		price: number;
	}[];
	redirect_url: string;
}
