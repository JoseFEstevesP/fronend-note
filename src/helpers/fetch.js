export const fetchData = () => {
	const helpFetch = async ({ url, options = {} }) => {
		const defaultOptions = {
			mode: 'cors',
		};
		options.body = JSON.stringify(options.body) || false;
		if (!options.body) delete options.body;
		const requestOptions = Object.assign({}, defaultOptions, options);
		try {
			const response = await fetch(url, requestOptions);
			return await response.json();
		} catch (error) {
			throw new Error(`Error de busqueda: ${error.message}`);
		}
	};
	const get = ({ url, options = {} }) => {
		options.method = 'GET';
		return helpFetch({ url, options });
	};
	const post = ({ url, options = {} }) => {
		options.method = 'POST';
		return helpFetch({ url, options });
	};
	const put = ({ url, options = {} }) => {
		options.method = 'PATCH';
		return helpFetch({ url, options });
	};
	const del = ({ url, options = {} }) => {
		options.method = 'DELETE';
		return helpFetch({ url, options });
	};
	return { get, post, put, del };
};
