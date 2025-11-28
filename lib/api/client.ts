import Cookies from "js-cookie";

const API_BASE_URL =
	process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const token = Cookies.get("auth-token");

		const config: RequestInit = {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
				...options.headers
			}
		};

		try {
			const response = await fetch(`${this.baseURL}${endpoint}`, config);

			if (!response.ok) {
				const error = await response
					.json()
					.catch(() => ({ message: "Network error" }));
				throw new Error(
					error.message || `HTTP error ${response.status}`
				);
			}

			const data = await response.json();

			// Validate response structure
			if (typeof data !== "object" || data === null) {
				throw new Error("Invalid API response: expected object");
			}

			// Normalize response structure to always use 'responses' field
			// The API returns 'response' (singular) for single items and 'responses' (plural) for lists
			// We normalize to 'responses' for consistency in the codebase
			if ("response" in data && !("responses" in data)) {
				return {
					...data,
					responses: data.response
				} as T;
			}

			// If 'responses' already exists or neither field exists, return as-is
			return data as T;
		} catch (error) {
			// Re-throw Error objects with descriptive messages
			if (error instanceof Error) {
				throw error;
			}
			// Wrap non-Error objects
			throw new Error(`API request failed: ${String(error)}`);
		}
	}

	async get<T>(endpoint: string): Promise<T> {
		console.log(endpoint);
		return this.request<T>(endpoint, { method: "GET" });
	}

	async post<T>(endpoint: string, data?: any): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined
		});
	}

	async put<T>(endpoint: string, data?: any): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}

	async upload<T>(endpoint: string, file: File): Promise<T> {
		const token = Cookies.get("auth-token");
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch(`${this.baseURL}${endpoint}`, {
			method: "POST",
			headers: {
				...(token && { Authorization: `Bearer ${token}` })
			},
			body: formData
		});

		if (!response.ok) {
			const error = await response
				.json()
				.catch(() => ({ message: "Upload failed" }));
			throw new Error(error.message || `HTTP ${response.status}`);
		}

		return response.json();
	}
}

export const apiClient = new ApiClient(API_BASE_URL);
