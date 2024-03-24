import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: false,
			text: 'Transactions Bar Chart',
		},
	},
};

export default function BarChart({ month }) {
	const [data, setData] = useState({
		_id: null,
		'0-100': 1,
		'101-200': 1,
		'201-300': 1,
		'301-400': 0,
		'401-500': 2,
		'501-600': 0,
		'601-700': 3,
		'701-800': 0,
		'801-900': 2,
		'901-above': 1,
	});

	const barData = async (barMonth) => {
		try {
			const response = await fetch(
				`http://localhost:3030/api/v1/transaction/bar-chart/${barMonth}`,
			);
			const monthData = await response.json();
			setData(monthData);
		} catch (error) {
			console.log(error);
		}
	};

	const formattedData = {
		labels: Object.keys(data).filter((key) => key !== '_id'),
		datasets: [
			{
				label: 'Transactions',
				data: Object.values(data).filter((value, index) => index !== 0),
				backgroundColor: ['rgba(54, 162, 235, 0.5)'],
			},
		],
	};

	useEffect(() => {
		barData(month);
	}, [month]);

	return (
		<>
			<Bar
				options={options}
				data={formattedData}
			/>
		</>
	);
}
