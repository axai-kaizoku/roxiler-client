import { useEffect, useState } from 'react';
import { getMonthName } from './utils';
import BarChart from './components/BarChart';
import Statistics from './components/Statistics';
import PieChart from './components/PieChart';
import DropDown from './components/Dropdown';
import { months } from './constants/index';
import Loading from './components/Loading';
import Modal from './components/Modal';

export default function App() {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [month, setMonth] = useState(3);
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [transId, setTransId] = useState(1);

	const fetchTransactions = async (pageNo) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://roxiler-api-c3u0.onrender.com/api/v1/transaction/page/${pageNo}`,
			);
			const Transactiondata = await response.json();
			setData(Transactiondata);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	const prevPage = async () => {
		try {
			if (page === 1) {
				return;
			} else {
				setPage(page - 1);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const nextPage = async () => {
		try {
			if (page === 6) {
				return;
			} else {
				setPage(page + 1);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const searchResults = async (searchMonth = 3, searchKeyword) => {
		try {
			setLoading(true);
			let url = `https://roxiler-api-c3u0.onrender.com/api/v1/transaction/search/${searchMonth}`;
			if (searchKeyword && searchKeyword.trim() !== '') {
				url += `/${searchKeyword.trim()}`;
			}
			const response = await fetch(url);
			const searchData = await response.json();
			setData(searchData);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleSelectChange = (value) => {
		setMonth(value);
	};

	useEffect(() => {
		searchResults(month, keyword);
	}, [month, keyword]);

	useEffect(() => {
		fetchTransactions(page);
	}, [page]);

	return (
		<main className="w-full min-h-screen bg-slate-50">
			<Loading loading={loading} />
			<div className="py-8 text-6xl text-center font-extralight">
				Transaction Dashboard
			</div>
			{/* Table start */}
			<div className="flex justify-center my-16">
				<div className="flex flex-col w-11/12 sm:w-5/6">
					<div className="flex justify-between w-full">
						<input
							type="text"
							onChange={(e) => {
								setKeyword(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') setKeyword(e.target.value);
							}}
							className="w-2/6 h-12 p-4 pl-12 text-sm bg-white border rounded-full outline-none cursor-pointer max-sm:rounded-full"
							placeholder="Search transaction"
						/>
						<div>
							<DropDown
								options={months}
								onSelectChange={handleSelectChange}
							/>
						</div>
					</div>
					<table className="p-10  my-8 bg-white rounded-md">
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Description</th>
								<th>Price</th>
								<th>Category</th>
								<th>Sold</th>
								<th>Image</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{data.length > 0 ? (
								data.map((row) => (
									<tr key={row.id}>
										<td>{row.id}</td>
										<td>{row.title}</td>
										<td>
											{row.description.slice(
												0,
												row.description.lastIndexOf(' ', 80),
											)}{' '}
											<button
												onClick={() => {
													setTransId(row.id);
													setIsOpen(true);
												}}
												className="border-b hover:text-blue-500 ">
												{' '}
												...more
											</button>
										</td>
										<td>{row.price.toFixed(2)}</td>
										<td className="capitalize">{row.category}</td>
										<td>
											<span>{row.sold ? 'Sold' : 'Available'}</span>
										</td>
										<td>
											<img
												src={row.image}
												alt="item pic"
												className="object-contain w-24 h-24 cursor-pointer"
												onClick={() => {
													setTransId(row.id);
													setIsOpen(true);
												}}
											/>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7}>
										<p className="p-10 text-4xl text-center">No Data</p>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<Modal
						isOpen={isOpen}
						closeModal={() => setIsOpen(false)}
						id={transId}
					/>
					<div className="flex justify-end w-full gap-12 px-4">
						<p className="p-3 font-semibold text-lg">
							Rows per page: {data.length}
						</p>
						<p className="p-3 font-semibold text-lg">Page {page} of 6</p>
						<div className="flex">
							<button
								onClick={prevPage}
								className="p-3 mx-1 rounded-xl border">
								<img
									src="/chevron-left.svg"
									alt="left"
									className="max-sm:w-12 max-sm:h-12 w-5 h-5 object-contain"
								/>
							</button>{' '}
							<button
								onClick={nextPage}
								className="p-3 mx-1 rounded-xl border">
								<img
									src="/chevron-right.svg"
									alt="right"
									className="max-sm:w-12 max-sm:h-12 w-5 h-5 object-contain"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Table end */}

			{/* Statistics start */}
			<div className="flex justify-center my-10">
				<div className="flex flex-col w-3/4">
					<Statistics month={month} />
				</div>
			</div>
			{/* Statistics end */}

			{/* Bar Chart Start */}
			<div className="flex justify-center my-10">
				<div className="w-full sm:w-4/5">
					<h2 className="p-4 text-4xl font-extralight">
						Bar Chart Stats - {getMonthName(month)}
					</h2>
					<div className="w-full">
						<BarChart month={month} />
					</div>
				</div>
			</div>
			{/* Bar Chart end */}

			{/* Pie Chart start */}
			<div className="flex justify-center my-20">
				<div className="flex justify-center  items-center w-full sm:w-4/5 flex-col">
					<h2 className="p-4 text-4xl max-sm:w-full font-extralight">
						Pie Chart Stats - {getMonthName(month)}
					</h2>
					<div className="flex justify-center items-center w-full sm:w-2/4 p-10 ">
						<PieChart month={month} />
					</div>
				</div>
			</div>
			{/* Pie Chart end */}
		</main>
	);
}
