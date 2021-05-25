export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function pick<T, U extends keyof T>(obj: T, keys: ReadonlyArray<U>, ignoreUndefined?: boolean): Writeable<Pick<T, U>>;
