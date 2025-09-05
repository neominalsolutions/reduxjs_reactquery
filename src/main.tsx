import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './store.ts';

// 2.adım

// Reduxda tek bir provider vardır
// Uygulama geneli Provider ile sarmallanlır. Böylelikle tüm sayfalar Redux statelere erişilebilir olur. İkinci bir Provider ihtiyaç yoktur.
// Provider Store içerisindeli bilgiler üzerinden bir Global State yönetim servisi sağlayacaktır.
createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
