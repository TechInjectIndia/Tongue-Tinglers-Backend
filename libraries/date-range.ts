
// Helper function to get the start of the week (Monday)
function getStartOfWeek(date: any) {
    const start = date.getDate() - date.getDay() + 1; // Adjusted to Monday
    return new Date(date.setDate(start));
}

// Helper function to get the end of the week (Sunday)
function getEndOfWeek(date: any) {
    const end = date.getDate() - date.getDay() + 7; // Adjusted to Sunday
    return new Date(date.setDate(end));
}

// Helper function to get the start of the month
function getStartOfMonth(date: any) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Helper function to get the end of the month
function getEndOfMonth(date: any) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Helper function to get the start of the year
function getStartOfYear(date: any) {
    return new Date(date.getFullYear(), 0, 1);
}

// Helper function to get the end of the year
function getEndOfYear(date: any) {
    return new Date(date.getFullYear(), 11, 31);
}

// Helper functions to calculate date ranges
export function getDateRange(period) {
    const today = new Date();
    let start: any, end: any;

    switch (period) {
        case 'Week':
            start = getStartOfWeek(new Date(today));
            end = getEndOfWeek(new Date(today));
            break;
        case 'Month':
            start = getStartOfMonth(new Date(today));
            end = getEndOfMonth(new Date(today));
            break;
        case 'Year':
            start = getStartOfYear(new Date(today));
            end = getEndOfYear(new Date(today));
            break;
        default:
            throw new Error('Invalid period');
    }

    return { start, end };
}