export const getQueryDateRange = (numberOfDays: number) => {
    return {
        start_date: new Date(
            new Date().setDate(new Date().getDate() - numberOfDays)
        ),
        end_date: new Date(),
    };
};

