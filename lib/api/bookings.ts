import queryString from "query-string";

import {
	Booking,
	BookingCreateRequest,
	BookingCreateResponse
} from "@/types/booking";
import { APIResponse } from "@/types/api";
import { apiClient } from "./client";

export interface BookingsResponse {
	total: number;
	page: number;
	pages: number;
	limit: number;
}

export const bookingsApi = {
	createBooking: async (
		data: BookingCreateRequest
	): Promise<APIResponse<BookingCreateResponse>> => {
		try {
			return apiClient.post<APIResponse<BookingCreateResponse>>(
				"/bookings/create",
				data
			);
		} catch (error) {
			throw new Error("Failed to create package", { cause: error });
		}
	},

	getBooking: async (id: string): Promise<APIResponse<Booking>> => {
		return apiClient.get<APIResponse<Booking>>(
			`/bookings/${id}?${queryString.stringify({
				invoice: true
			})}`
		);
	},

	generateInvoice: async (id: string): Promise<{ url: string }> => {
		return apiClient.post<{ url: string }>(`/bookings/${id}/invoice`);
	}
};
