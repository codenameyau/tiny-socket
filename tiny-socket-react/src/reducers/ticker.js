export const ACTION_HANDLERS = {
	GET_TICKER: (state, action) => {
		return action.res || [];
	}
};

const initialState = [];

export function gifsReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}

export default gifsReducer;
