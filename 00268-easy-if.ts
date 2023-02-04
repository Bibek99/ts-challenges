// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

type error = If<null, "a", "b">;

// ============= Your Code Here =============
type truep = true;
type If<C, T, F> = C extends null | undefined ? never : C extends true ? T : F;
