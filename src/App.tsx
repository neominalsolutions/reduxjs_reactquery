/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
	decrement,
	increment,
	incrementByValue,
	reset,
} from './contexts/counter/counter.slice';
import type { AppDispatch, RootState } from './store';
import { fetchProducts } from './contexts/products/product.slice';

const CounterActions = () => {
	const [number, setNumber] = useState(0);
	const dispatch = useDispatch<AppDispatch>(); // state güncellemelerini dispatch ile yapıyoruz.
	return (
		<>
			<button onClick={() => dispatch(increment())}>(+)</button>
			<button onClick={() => dispatch(decrement())}>(-)</button>
			<button onClick={() => dispatch(reset())}>(x)</button>
			<hr></hr>
			<input onInput={(e: any) => setNumber(Number(e.target.value))} />
			<button onClick={() => dispatch(incrementByValue({ value: number }))}>
				Increment By Value
			</button>
		</>
	);
};
const CounterView = () => {
	// store bağlanıp counter state component içerisinde kullanacağız.// Subscription işlemi
	const { counterState } = useSelector((rootState: RootState) => rootState);
	console.log('CounterView Rendering...');

	return (
		<>
			<p>Sayac: {counterState.count}</p>
			<CounterViewChild />
		</>
	);
};

const CounterViewChild = () => {
	console.log('CounterViewChild Rendering...');
	return <>CounterViewChild</>;
};

const ProductView = ({ data }: { data: any[] }) => {
	return <>Products Count: {data.length}</>;
};

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { productState } = useSelector((state: RootState) => state);

	useEffect(() => {
		// Süreci aseknron olarak başlattık.
		// asenkron api redux çağırıları useEffect içerisinde tanımlanır.
		dispatch(fetchProducts());
	}, []);

	return (
		<>
			<CounterActions />
			<hr></hr>
			<CounterView />
			<hr></hr>
			{productState.loading && <>.... Loading Product</>}
			{productState.data && <ProductView data={productState.data} />}
		</>
	);
}

export default App;
