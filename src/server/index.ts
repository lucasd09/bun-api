import type {
	CallbackError,
	Endpoint,
	EndpointCallback,
	EndpointParams,
} from "./types";

const createServer = () => {
	const endpoints: Endpoint[] = [];
	const errors: CallbackError[] = [];

	const baseEndpoint = (path: string, endpointParams: EndpointParams) => {
		endpoints.push({ path, params: endpointParams });
		return api;
	};

	const onError = (callbackError: CallbackError) => {
		errors.push(callbackError);
	};

	const handleError = async (e: unknown) => {
		for (const error of errors) {
			const errorResponse = await error(e);
			if (errorResponse) {
				return Response.json(errorResponse);
			}
		}
	};

	const get = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "GET" });
	};
	const post = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "POST" });
	};
	const update = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "UPDATE" });
	};
	const patch = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "PATCH" });
	};
	const put = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "PUT" });
	};
	const deleteBase = <TPath extends string>(
		path: TPath,
		callback: EndpointCallback<TPath>,
	) => {
		return baseEndpoint(path, { callback, method: "DELETE" });
	};

	const start = () => {
		return Bun.serve({
			fetch: async (request) => {
				const { pathname } = new URL(request.url);
				const method = request.method;
				const splittedRoute = pathname.split("/");
				const route = splittedRoute[1];

				// /login POST
				// /login POST
				for (const endpoint of endpoints) {
					const routeMatches = endpoint.path.includes(route);

					if (!routeMatches) {
						continue;
					}

					if (endpoint.params.method !== method) {
						continue;
					}

					try {
						const hasValues = pathname.split(`${route}/`)[1];

						const hasParams = endpoint.path.includes(":");

						if (hasValues && !hasParams) {
							continue;
						}

						if (!hasParams) {
							const result = await endpoint.params.callback({ request });

							return Response.json(result);
						}

						if (splittedRoute.length < 3) {
							continue;
						}

						const paramName = endpoint.path.split(":")[1];
						const paramValue = pathname.split(`${route}/`)[1];

						const result = await endpoint.params.callback({
							request,
							params: { [paramName]: paramValue },
						});

						return Response.json(result);
					} catch (e) {
						const error = await handleError(e);
						if (error) {
							return error;
						}
					}
				}

				return new Response("404");
			},
		});
	};

	const api = {
		get,
		post,
		update,
		patch,
		put,
		delete: deleteBase,
		start,
		onError,
	};
	return api;
};

export default createServer;
