import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function DropDown({ options, onSelectChange }) {
	const [selected, setSelected] = useState(options[2]);
	const handleChange = (e) => {
		setSelected(e);
		onSelectChange(e.value);
	};
	return (
		<div className="h-12 w-fit">
			<Listbox
				value={selected}
				onChange={handleChange}>
				<div className="relative z-10 w-40 h-12">
					<Listbox.Button className="relative flex items-center justify-between w-full px-3 py-2 text-left bg-white border rounded-lg shadow-md cursor-default h-11 sm:min-w-24 min-w-36 sm:text-sm">
						<span className="block truncate">{selected.title}</span>
						<img
							src="/chevron-up-down.svg"
							width={20}
							height={20}
							className="object-contain ml-4"
							alt="updown"
						/>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opactiy-0">
						<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{options.map((option) => (
								<Listbox.Option
									key={option.title}
									value={option}
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4 ${
											active ? 'bg-blue-700 text-white' : 'text-gray-900'
										}`
									}>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}>
											{option.title}
										</span>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
