"use server";

import { PackageFilters } from "@/types/package";
import { packagesApi } from "../api/packages";

export const getTourPackages = async (filters: {
	limit: number;
	status?: PackageFilters["status"];
}) => {
	try {
		const tourPackages = await packagesApi.getPackages(
			undefined,
			filters.limit,
			{ ...filters }
		);
		return tourPackages;
	} catch (error) {
		console.log("Failed to get packages:", error);
		throw error;
	}
};

export const getTourPackage = async (id: string) => {
	try {
		const tourPackage = await packagesApi.getPackage(id);
		return tourPackage;
	} catch (error) {
		console.log("Failed to get package:", error);
		throw error;
	}
};
