import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
	count: number;
};

const initState: CounterState = {
	count: 0,
};

const counterSlice = createSlice({
	name: 'Counter',
	initialState: initState,
	reducers: {
		// state değiştirmek için gerekli olan methodları functionları buraya yazıyoruz.
		increment: (state: CounterState) => {
			state.count = state.count + 1; // state güncelleyip geçiyoruz. state return etmeye ihtiyacımız yok.
		},
		decrement: (state: CounterState) => {
			if (state.count > 0) {
				state.count = state.count - 1;
			}
		},
		reset: (state: CounterState) => {
			state.count = 0;
		},
		incrementByValue: (
			state: CounterState,
			action: PayloadAction<{ value: number }>
		) => {
			// dışarıdan gelen bir payload değerine göre state.count güncellenecek
			state.count = action.payload.value;
		},
	},
});

// componentler üzerinden actionları dispatch ile tetiklemek ,için actionları export ettik.
export const { increment, decrement, reset, incrementByValue } =
	counterSlice.actions;

// storeda counterState'ini tutacak olan counterReducer'da dışarı export ettik. Store üzerinden çağırma işlemi yapıcaz.
export const counterReducer = counterSlice.reducer;
