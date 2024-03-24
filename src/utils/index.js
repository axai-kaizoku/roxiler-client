export const getMonthName = (monthNumber) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// Validate the input month number
	if (monthNumber < 1 || monthNumber > 12 || isNaN(monthNumber)) {
		throw new Error(
			'Invalid month number. Please provide a number between 1 and 12.',
		);
	}

	// Return the corresponding month name
	return months[monthNumber - 1];
};
