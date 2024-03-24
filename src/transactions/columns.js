import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
	_id: string,
	id: string,
	title: string,
	price: number,
	description: string,
	category: string,
	image: string,
	sold: boolean,
	dateOfSale: Date,
	__v: number,
};

// _id: '65ff0ec7790619a042e4d3f9',
// 		id: '10',
// 		title: 'SanDisk SSD PLUS 1TB Internal SSD  SATA III 6 Gbs',
// 		price: 763,
// 		description:
// 			'Easy upgrade for faster boot up shutdown application load and response As compared to 5400 RPM SATA 2.5 hard drive Based on published specifications and internal benchmarking tests using PCMark vantage scores Boosts burst write performance making it ideal for typical PC workloads The perfect balance of performance and reliability Readwrite speeds of up to 535MBs450MBs Based on internal testing Performance may vary depending upon drive capacity host device OS and application.',
// 		category: 'electronics',
// 		image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
// 		sold: false,
// 		dateOfSale: '2022-03-27T14:59:54.000Z',
// 		__v: 0,

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
];
