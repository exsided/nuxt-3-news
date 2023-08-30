import { MONTHS_NAMES } from '~/consts/date.js';

export const randomDate = () => new Date(new Date() - Math.random() * (1e+12));

export const dateFromatter = (date) =>
{
	if (!date)
	{
		console.log('dateFromatter - неверный формат', date);
		return '';
	}

	const [day, month, year] = date.split('.');

	return `${day} ${MONTHS_NAMES[Number(month)]} ${year}`;
};
