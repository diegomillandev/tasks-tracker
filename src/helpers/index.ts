export const cn = (...args:  Array<string | number | boolean | undefined | null>) => {
    return args.filter(Boolean).join(' ');
};

export const months = [
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
