export type PackageStatus = "active" | "inactive" | "draft";

export interface PackageAddOn {
	name: string;
	price: number;
}

export interface Package {
	_id: string;
	title: string;
	slug: string;
	description: string;
	base_price: number;
	guest_limit: number;
	extra_guest_fee: number;
	duration_hours: number;
	images: string[];
	addons: PackageAddOn[];
	available_dates: Date[];
	status: PackageStatus;
	created_at: string;
}

export interface PackageFilters {
	status?: PackageStatus[];
	priceRange?: {
		min: number;
		max: number;
	};
	search?: string;
}
