let timeOutId: any;
export const debounce = (fn: any, delay: number = 2000) => {
    return (...args: any) => {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}