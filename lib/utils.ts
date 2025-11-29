import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const PLACEHOLDER_IMAGE =
	"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&h=400&q=80";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a price value with currency symbol and thousand separators (Ghanaian locale)
 * @param price - The price value to format
 * @param perPerson - Whether to show "per person" or "per couple" text
 * @returns Formatted price string (e.g., "GH₵1,234 per couple")
 */
export function formatPrice(
	price: number | null | undefined,
	perPerson: boolean = false
): string {
	// Handle edge cases
	if (price === null || price === undefined || price < 0) {
		return "GH₵0 per couple";
	}

	// Format with Ghanaian currency symbol and thousand separators
	const formattedPrice = new Intl.NumberFormat("en-GH", {
		style: "currency",
		currency: "GHS",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price);

	// Add per-person or per-couple text
	const suffix = perPerson ? "per person" : "per couple";

	return `${formattedPrice} ${suffix}`;
}
/**
 * Formats a time string to a readable format (e.g., "10:00 AM")
 * @param time - The time string to format (supports 24-hour, 12-hour, ISO strings)
 * @returns Formatted time string (e.g., "10:00 AM")
 */
export function formatTime(time: string | null | undefined): string {
	// Handle edge cases
	if (!time) {
		return "TBD";
	}

	try {
		// Try to parse as ISO string first
		let date: Date;

		// Check if it's an ISO string (contains 'T' or 'Z')
		if (time.includes("T") || time.includes("Z")) {
			date = new Date(time);
		}
		// Check if it's already in 12-hour format (contains AM/PM)
		else if (
			time.toUpperCase().includes("AM") ||
			time.toUpperCase().includes("PM")
		) {
			return time.trim();
		}
		// Assume it's a time string like "10:00" or "14:30"
		else {
			// Create a date object with today's date and the given time
			const [hours, minutes] = time
				.split(":")
				.map((part) => parseInt(part, 10));

			if (isNaN(hours) || isNaN(minutes)) {
				return time; // Return original if parsing fails
			}

			date = new Date();
			date.setHours(hours, minutes, 0, 0);
		}

		// Check if date is valid
		if (isNaN(date.getTime())) {
			return time; // Return original if invalid
		}

		// Format to 12-hour time with AM/PM (Ghanaian locale)
		return date.toLocaleTimeString("en-GH", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true
		});
	} catch (error) {
		// If any error occurs, return the original time string
		return time;
	}
}
