/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
	decrement,
	increment,
	incrementByValue,
	reset,
} from './contexts/counter/counter.slice';
import type { AppDispatch, RootState } from './store';

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

function App() {
	return (
		<>
			<CounterActions />
			<hr></hr>
			<CounterView />
		</>
	);
}

export default App;
