/* eslint-disable @typescript-eslint/no-explicit-any */
// Api ile çalışırken APIden gelen server state client state aktarılmak istediğinde Redux Thunk middleware

import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';

// Client State ile çalışırken sadece reducer kullanırız
// Server ve Client State çalışırken  (API güdümlü) extraReducers kullanırız. Normal reducer ile yazılmaz.

// API ile haberleşirken yapmamız gereken takip etmemiz gerek 3 farklı state var. Promise ile ilgili state bunlar. fulfilled state -> promise resolve, rejected => promise reject demek, birde loading anı yani pending state,

// Dispatch edeceğimiz action bu olucak.
// Veriler çekilirken THUNK middlewareden geçer ve çekilen verinin takibini yapmamızı sağlar.
export const fetchProducts = createAsyncThunk('Products', async () => {
	const response = await fetch(
		'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
	);

	const data = await response.json();

	return data.value;
});

// Bütün asenkron veri çekme veya veri gönderim süreçleri bu statelerden geçmek zorundadır.
// GET,POST,PUT,DELETE,PATCH
export type AsyncState<T> = {
	loading: boolean;
	data: T; // verileri buradan artık client state aktarıldıktan sonra okuyucağız.
	error: any;
};

const initState: AsyncState<any> = { loading: false, data: null, error: null };

const ProductSlice = createSlice({
	name: 'ASYNC_Products',
	initialState: initState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchProducts.pending, (state: AsyncState<any>) => {
			state.loading = true;
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state: AsyncState<any>, action: PayloadAction<any>) => {
				state.loading = false;
				state.data = action.payload; // server state to client State
			}
		);
		builder.addCase(
			fetchProducts.rejected,
			(state: AsyncState<any>, action: PayloadAction<any>) => {
				state.loading = false;
				state.data = null;
				state.error = action.payload; // her türlü başarılı yada başarısız caselerde  action.payload; resolve data yada rejected data veririr
			}
		);
	},
});

export const productReducer = ProductSlice.reducer;
