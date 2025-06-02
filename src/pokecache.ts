export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    };

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        })
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.#cache.get(key);
    }

    #reap(): void {
        for (const c of this.#cache.entries()) {
            if (c[1].createdAt < Date.now() - this.#interval) {
                this.#cache.delete(c[0]);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }
}
