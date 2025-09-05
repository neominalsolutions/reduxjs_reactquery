import { configureStore } from '@reduxjs/toolkit';

// 1. Aşama store oluşturma

// Uygulama içerisinde barındırılan tüm stateler store altında birleşir.
export const store = configureStore({
	reducer: {}, // herbir global state yönetimi reducer içerisinde tanımlanıyor, CartState, FavoriteProductsState, ShortUrlState, ThemeState her biri için bir reducer tanımı yapılmalıdır
});

// Uygulama içerisinde tüm state erişmemizi sağlayan export edilmiş type
export type RootState = ReturnType<typeof store.getState>;
// Uygulama içerisinde State değiştirme işmlerini yani actionları tetikleyecek olan type
export type AppDispatch = typeof store.dispatch;
