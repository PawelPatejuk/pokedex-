export class Cache {
    #cache = new Map();
    #reapIntervalID = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    ;
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    }
    get(key) {
        return this.#cache.get(key);
    }
    #reap() {
        for (const c of this.#cache.entries()) {
            if (c[1].createdAt < Date.now() - this.#interval) {
                this.#cache.delete(c[0]);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }
}
