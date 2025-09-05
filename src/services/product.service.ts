export const getProducts = async (nextPageIndex: number) => {
	const response = await fetch(
		`https://services.odata.org/northwind/northwind.svc/Products?&$top=5&$skip=${
			5 * (nextPageIndex - 1)
		}&$format=json`
	);

	const data = await response.json();

	return data.value;
};
