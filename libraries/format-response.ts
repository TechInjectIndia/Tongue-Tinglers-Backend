import common500 from "constants";

export default (message, data, error = false) => ({
    error: !!error,
    message: message || (error ? common500 : "Success"),
    data,
});