import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const PLACEHOLDER_IMAGE =
	"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&h=400&q=80";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
