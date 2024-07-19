type DebounceOptions = {
    maxWait?: number;
};

export type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    options: DebounceOptions = {},
): DebouncedFunction<T> => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastCallTime: number | null = null;
    let lastInvokeTime = 0;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const currentTime = Date.now();

        if (!lastCallTime) {
            lastCallTime = currentTime;
        }

        const timeSinceLastInvoke = currentTime - lastInvokeTime;

        const shouldInvoke = timeout === null || (options.maxWait && timeSinceLastInvoke >= options.maxWait);

        const later = () => {
            lastInvokeTime = Date.now();
            timeout = null;
            func.apply(this, args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }

        if (shouldInvoke) {
            later();
        } else {
            timeout = setTimeout(later, wait);
        }

        lastCallTime = currentTime;
    };
};