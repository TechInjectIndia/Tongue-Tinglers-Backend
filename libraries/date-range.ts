// Helper function to get the start of the current week (Monday)
function getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay() + 1);
    start.setHours(0, 0, 0, 0);
    return start;
}

// Helper function to get the end of the current week (Sunday)
function getEndOfWeek(date: Date): Date {
    const end = new Date(date);
    end.setDate(date.getDate() - date.getDay() + 7);
    end.setHours(23, 59, 59, 999);
    return end;
}

// Helper function to get the start of the month
function getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

// Helper function to get the end of the month
function getEndOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

// Helper function to calculate last month’s start and end
function getLastMonthRange(date: Date): { start: Date; end: Date } {
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return {
        start: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1, 0, 0, 0, 0),
        end: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0, 23, 59, 59, 999),
    };
}

// Helper function to calculate last week’s start and end
function getLastWeekRange(date: Date): { start: Date; end: Date } {
    const lastWeekEnd = new Date(getStartOfWeek(date).getTime() - 1);
    const lastWeekStart = getStartOfWeek(lastWeekEnd);
    return { start: lastWeekStart, end: lastWeekEnd };
}

// Helper function to get the start of the year
function getStartOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0); // January 1st
}

// Helper function to get the end of the year
function getEndOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999); // December 31st
}

// Helper function to calculate last year's start and end
function getLastYearRange(date: Date): { start: Date; end: Date } {
    const lastYear = date.getFullYear() - 1;
    return {
        start: new Date(lastYear, 0, 1, 0, 0, 0, 0),
        end: new Date(lastYear, 11, 31, 23, 59, 59, 999),
    };
}

// Main function to calculate date ranges
export function getDateRange(period: string, startDate?: string, endDate?: string): { start: Date; end: Date } {
    const today = new Date();
    let start: Date;
    let end: Date;

    switch (period) {
        case 'this_week':
            start = getStartOfWeek(today);
            end = getEndOfWeek(today);
            break;
        case 'last_week':
            ({ start, end } = getLastWeekRange(today));
            break;
        case 'this_month':
            start = getStartOfMonth(today);
            end = getEndOfMonth(today);
            break;
        case 'last_month':
            ({ start, end } = getLastMonthRange(today));
            break;
        case 'this_year':
            start = getStartOfYear(today);
            end = getEndOfYear(today);
            break;
        case 'last_year':
            ({ start, end } = getLastYearRange(today));
            break;
        case 'custom':
            if (!startDate || !endDate) {
                throw new Error("Custom date range requires both startDate and endDate");
            }
            start = new Date(startDate);
            end = new Date(endDate);
            break;
        default:
            throw new Error("Invalid period specified");
    }

    return { start, end };
}
