import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";
describe.each([
    {
        input: "hello, world",
        expected: ["hello,", "world"],
    },
    {
        input: "1, 2, 3",
        expected: ["1,", "2,", "3"],
    },
    {
        input: "hey",
        expected: ["hey"],
    },
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    cache.add(key, val);
    const cached = cache.get(key)?.val;
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key)?.val;
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});
