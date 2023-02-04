// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

type error = MyAwaited<number>;

// ============= Your Code Here =============
type MyAwaited<T> = T extends null | undefined
  ? T
  : T extends {
      then: (onfulfilled: infer F) => any; // unwrapping the promise, infering the arg type
    }
  ? F extends (arg: infer R) => any // if the arg in then is callable recursively unwrap the promises
    ? MyAwaited<R>
    : never
  : T;
