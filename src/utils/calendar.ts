import dayjs from 'dayjs';

export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year()
) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

    const datesInMonth = [];

    // Add empty days to the beginning of the month
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        datesInMonth.push({
            currentMont: false,
            date: firstDateOfMonth.day(i),
        });
    }

    // generate current date
    for (
        let day = firstDateOfMonth.date();
        day <= lastDateOfMonth.date();
        day++
    ) {
        datesInMonth.push({
            date: firstDateOfMonth.date(day),
            currentMont: true,
            today:
                firstDateOfMonth.date(day).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    // Add empty days to the end of the month
    const remaining = 42 - datesInMonth.length;

    for (
        let i = lastDateOfMonth.date() + 1;
        i <= lastDateOfMonth.date() + remaining;
        i++
    ) {
        datesInMonth.push({
            date: lastDateOfMonth.date(i),
            currentMont: false,
        });
    }

    return datesInMonth;
};
