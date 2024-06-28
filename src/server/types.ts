export type EndpointResponse = object | string | Promise<void> | void;

export type Path<TPath extends string> =
	TPath extends `${infer _}/:${infer Param}` ? Param : never;

export type ParamType<TPath extends string> = Record<Path<TPath>, string>;

export type CallbackParams<TPath extends string> = {
	request: Request;
	params?: ParamType<TPath>;
};
export type EndpointCallback<T extends string = string> = (
	params: CallbackParams<T>,
) => EndpointResponse;

export type Method = "GET" | "POST" | "UPDATE" | "PUT" | "PATCH" | "DELETE";

export type EndpointParams = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	callback: EndpointCallback<any>;
	method: Method;
};

export type Endpoint = { path: string; params: EndpointParams };

export type CallbackError = (
	e: unknown,
) => object | Promise<object> | void | Promise<void>;
