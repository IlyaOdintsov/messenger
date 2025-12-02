export function formatDate(time: Date, type: 'def' | 'time' | 'day' | 'date'): string {
	const date = new Date(time);
	const now = new Date();

	const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

	if ((type === 'def' && diffDays < 1) || type === 'time') {
		return date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	if ((type === 'def' && diffDays < 7) || type === 'day') {
		const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
		return daysOfWeek[date.getDay()];
	}

	if (type === 'def' || type === 'date') {
		return time.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}

	return '';
}
