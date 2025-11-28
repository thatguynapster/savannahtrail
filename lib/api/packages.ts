import queryString from "query-string";

import { Package, PackageFilters } from "@/types/package";
import { APIResponse } from "@/types/api";
import { apiClient } from "./client";

export interface PackagesResponse {
	total: number;
	page: number;
	pages: number;
	limit: number;
}

export const packagesApi = {
	getPackages: async (
		page = 1,
		limit = 10,
		filters?: PackageFilters
	): Promise<APIResponse<PackagesResponse & { docs: Package[] }>> => {
		try {
			return apiClient.get<
				APIResponse<PackagesResponse & { docs: Package[] }>
			>(
				`/packages?${queryString.stringify({
					page: page.toString(),
					limit: limit.toString(),
					...filters
				})}`
			);
		} catch (error) {
			throw new Error("Failed to fetch packages", { cause: error });
		}
	},

	getPackage: async (id: string): Promise<APIResponse<Package>> => {
		try {
			return apiClient.get<APIResponse<Package>>(`/packages/${id}`);
		} catch (error) {
			throw new Error("Failed to fetch package", { cause: error });
		}
	}
};
