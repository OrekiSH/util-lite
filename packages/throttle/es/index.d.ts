export declare function throttle(fn: Function, wait: number | string, options?: {
    leading?: boolean;
    trailing?: boolean;
}): (...args: unknown[]) => unknown;
