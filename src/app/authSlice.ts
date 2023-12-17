import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
	status: boolean;
	userData: any;
}

// Define the initial state using that type
const initialState: CounterState = {
	status: false,
	userData: null,
};

export const counterSlice = createSlice({
	name: 'counter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		login: (state, action): void => {
			state.status = true;
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.status = false;
		},
	},
});

export const { login, logout } = counterSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
