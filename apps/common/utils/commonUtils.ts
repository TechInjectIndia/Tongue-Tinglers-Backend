import { TUser } from "apps/user/interface/user";
import { v4 as uuidv4 } from "uuid";

const getUserName = (user: TUser) => {
    return user.firstName + " " + user.lastName;
};

const getUid = () => {
    let newId = uuidv4();
    return newId;
};

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
};

const formatDateUI = (date: any, showTime: boolean = false): string => {
    if (typeof date === "string" && new Date(date) instanceof Date) {
        date = new Date(date);
    }
    if (!date || !(date instanceof Date)) {
        return "NA";
    }
    let dateStr = [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join("-");
    if (showTime) {
        dateStr += ` ${padTo2Digits(date.getHours() % 12 || 12)}:${padTo2Digits(
            date.getMinutes(),
        )} ${date.getHours() / 12 < 1 ? "am" : "pm"}`;
    }
    return dateStr;
};

export { getUserName, getUid, formatDateUI };
