import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// QueryClientProvider ile uygulama geleninde react query yapısının çalışması için store benzeri bir yapıdır.
const queryClient = new QueryClient();
// İkinci aşamada ise QueryClientProvider ile tüm uygulama genelinde querylerin çalışmasını provider üzerinden yöntemek.

// 2.adım

// Reduxda tek bir provider vardır
// Uygulama geneli Provider ile sarmallanlır. Böylelikle tüm sayfalar Redux statelere erişilebilir olur. İkinci bir Provider ihtiyaç yoktur.
// Provider Store içerisindeli bilgiler üzerinden bir Global State yönetim servisi sağlayacaktır.
createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<App />
		</Provider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
