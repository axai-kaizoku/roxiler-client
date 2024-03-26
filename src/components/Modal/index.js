import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export default function Modal({ isOpen, closeModal, id }) {
	const [transaction, setTransaction] = useState({});
	const fetchTransaction = async (id) => {
		try {
			const response = await fetch(
				`https://roxiler-api-c3u0.onrender.com/api/v1/transaction/get-one/${id}`,
			);
			const data = await response.json();
			setTransaction(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchTransaction(id);
	}, [id]);
	return (
		<>
			<Transition
				appear
				show={isOpen}
				as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-4/5 h-4/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<button
										type="button"
										onClick={closeModal}
										className="absolute top-2 right-2 z-10 w-fit p-2 bg-slate-50 rounded-full">
										<img
											src="/x-mark.svg"
											alt="close"
											className="w-5 h-5 object-contain"
										/>
									</button>
									<div className="flex max-sm:flex-col">
										<div className="flex w-2/4 max-sm:w-full justify-center">
											<img
												src={transaction.image}
												alt="product-img"
												className="w-96 h-96 object-contain"
											/>
										</div>
										<div className="flex flex-col gap-6 w-2/5 max-sm:w-full">
											<Dialog.Title
												as="h3"
												className="text-2xl font-medium leading-6 text-gray-900">
												{transaction.title}
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500  capitalize">
													Category: {transaction.category}
												</p>
											</div>
											<div className="mt-2">
												<p className="text-base text-gray-500">
													{transaction.description}
												</p>
											</div>
											<div className="mt-1">
												<p className="text-lg font-medium text-gray-700">
													₹ {transaction.price}
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
