export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function omit<T, U extends keyof T>(obj: T, keys: ReadonlyArray<U>): Writeable<Omit<T, U>>;
