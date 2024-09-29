export class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	get<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		return this.makeRequest(path, { ...options, method: "GET" });
	}

	post<TReturn>(
		path: string,
		body: unknown,
		options: Omit<RequestInit, "body"> = {},
	): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
		});
	}

	put<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			method: "PUT",
		});
	}

	delete<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			method: "DELETE",
		});
	}

	private async makeRequest<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		const headers = new Headers();

		if (options.body) {
			headers.append("Content-Type", "application/json");
		}

		if (options.headers) {
			for (const [key, value] of Object.entries(options.headers)) {
				headers.append(key, value);
			}
		}

		const response = await fetch(`${this.baseURL}${path}`, {
			...options,
			headers,
		});

		const contentType = response.headers.get("content-type");

		let responseBody = null;

		if (contentType?.includes("application/json")) {
			responseBody = await response.json();
		}

		if (response.ok) {
			return responseBody as TReturn;
		}

		throw new Error(responseBody?.message || response.statusText);
	}
}
