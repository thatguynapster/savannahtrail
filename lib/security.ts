/**
 * Security utilities to mitigate react2shell and other vulnerabilities
 */

// HTML entity encoding to prevent XSS
export const escapeHtml = (unsafe: string): string => {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

// Validate and sanitize URLs to prevent javascript: and data: URI attacks
export const sanitizeUrl = (url: string): string => {
	const trimmed = url.trim();

	// Block dangerous protocols
	if (/^(javascript|data|vbscript|file|about):/i.test(trimmed)) {
		return "#";
	}

	// Allow only http, https, mailto, tel, and relative URLs
	if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
		return "#";
	}

	return trimmed;
};

// Validate email addresses
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email) && email.length <= 254;
};

// Validate phone numbers (basic validation)
export const isValidPhone = (phone: string): boolean => {
	const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
	return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Sanitize form data
export const sanitizeFormData = (
	data: Record<string, any>
): Record<string, any> => {
	const sanitized: Record<string, any> = {};

	for (const [key, value] of Object.entries(data)) {
		if (typeof value === "string") {
			// Remove script tags and dangerous content
			sanitized[key] = value
				.replace(
					/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
					""
				)
				.replace(
					/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
					""
				)
				.replace(/javascript:/gi, "")
				.replace(/on\w+\s*=/gi, "")
				.trim();
		} else {
			sanitized[key] = value;
		}
	}

	return sanitized;
};

// Rate limiting helper (client-side basic implementation)
export class RateLimiter {
	private attempts: Map<string, number[]> = new Map();

	constructor(
		private maxAttempts: number = 5,
		private windowMs: number = 60000
	) {}

	isAllowed(identifier: string): boolean {
		const now = Date.now();
		const attempts = this.attempts.get(identifier) || [];

		// Remove old attempts outside the window
		const validAttempts = attempts.filter(
			(time) => now - time < this.windowMs
		);

		if (validAttempts.length >= this.maxAttempts) {
			return false;
		}

		// Add current attempt
		validAttempts.push(now);
		this.attempts.set(identifier, validAttempts);

		return true;
	}
}

// Content validation for user inputs
export const validateContent = (
	content: string,
	maxLength: number = 1000
): boolean => {
	if (!content || content.length > maxLength) {
		return false;
	}

	// Check for suspicious patterns
	const suspiciousPatterns = [
		/<script/i,
		/javascript:/i,
		/on\w+\s*=/i,
		/<iframe/i,
		/eval\s*\(/i,
		/Function\s*\(/i,
		/setTimeout\s*\(/i,
		/setInterval\s*\(/i
	];

	return !suspiciousPatterns.some((pattern) => pattern.test(content));
};
