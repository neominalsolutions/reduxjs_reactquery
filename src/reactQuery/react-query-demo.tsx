import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProducts } from '../services/product.service';

function ReactQueryDemo() {
	console.log('...rendering');

	// state değiştikçe yeniden useQuery tetiklenir ['Products_Page_' + nextPageIndex] dinamik değer üzerinden çalıştığımız için her bir sayfa değişiminde yeni bir queryKey cachelenir. Product_Page_1
	const [nextPageIndex, setNextPageIndex] = useState(1);

	const { isFetched, data, error, isError, isLoading } = useQuery({
		queryKey: ['Products_Page_' + nextPageIndex],
		queryFn: async () => getProducts(nextPageIndex),
		retry: 3, // retry policy
		retryOnMount: true, // component bir state değişilikiği sonucunda mount olursa yeniden dene
		refetchOnWindowFocus: true, // window mouse ile focuslanınca tekrar veriyi çekme
		// refetchInterval: 6000, // dakikada bir veri çekmeyi otomatik olarak refresh et (Pooling yapısı)
	});

	if (isLoading) return <>... Loading </>;

	if (isError) return <>{error}</>;

	if (isFetched)
		return (
			<>
				<p>Data Lenght: {data.length}</p>

				<button onClick={() => setNextPageIndex(nextPageIndex + 1)}>
					Next Page
				</button>
				<button onClick={() => setNextPageIndex(nextPageIndex - 1)}>
					Prev Page
				</button>
			</>
		);

	return <></>;
}

export default ReactQueryDemo;
