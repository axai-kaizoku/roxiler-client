import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ month }) {
	const [data, setData] = useState([
		{
			category: "men's clothing",
			count: 1,
		},
		{
			category: 'jewelery',
			count: 2,
		},
		{
			category: "women's clothing",
			count: 2,
		},
	]);

	const pieData = async (pieMonth) => {
		try {
			const response = await fetch(
				`http://localhost:3030/api/v1/transaction/pie-chart/${pieMonth}`,
			);
			const monthData = await response.json();
			setData(monthData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		pieData(month);
	}, [month]);

	const labels = data.map((item) => item.category);
	const counts = data.map((item) => item.count);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Items',
				data: counts,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<Pie data={chartData} />
		</>
	);
}
