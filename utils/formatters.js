import { MONTHS_NAMES } from '~/consts/date.js';

export const dateFromatter = (date) =>
{
	if (!date)
	{
		console.log('dateFromatter - неверный формат', date);
		return '';
	}

	const [day, month, year] = date.split('.');

	return `${day} ${MONTHS_NAMES[Number(month) - 1]} ${year}`;
};
