import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './contexts/counter/counter.slice';
import { productReducer } from './contexts/products/product.slice';

// 1. Aşama store oluşturma

// Uygulama içerisinde barındırılan tüm stateler store altında birleşir.
export const store = configureStore({
	reducer: {
		productState: productReducer, // Async Thunk State
		counterState: counterReducer, // hangi reducer üzerinden hangis state yöneteceğiz.
	}, // herbir global state yönetimi reducer içerisinde tanımlanıyor, CartState, FavoriteProductsState, ShortUrlState, ThemeState her biri için bir reducer tanımı yapılmalıdır
});

// Uygulama içerisinde tüm state erişmemizi sağlayan export edilmiş type
export type RootState = ReturnType<typeof store.getState>;
// Uygulama içerisinde State değiştirme işmlerini yani actionları tetikleyecek olan type
export type AppDispatch = typeof store.dispatch;

// Dispatch asenkron çalışır.
