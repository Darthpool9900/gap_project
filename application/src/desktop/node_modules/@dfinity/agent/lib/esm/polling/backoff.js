const RANDOMIZATION_FACTOR = 0.5;
const MULTIPLIER = 1.5;
const INITIAL_INTERVAL_MSEC = 500;
const MAX_INTERVAL_MSEC = 60_000;
const MAX_ELAPSED_TIME_MSEC = 900_000;
const MAX_ITERATIONS = 10;
/**
 * Exponential backoff strategy.
 */
export class ExponentialBackoff {
    #currentInterval;
    #randomizationFactor;
    #multiplier;
    #maxInterval;
    #startTime;
    #maxElapsedTime;
    #maxIterations;
    #date;
    #count = 0;
    static { this.default = {
        initialInterval: INITIAL_INTERVAL_MSEC,
        randomizationFactor: RANDOMIZATION_FACTOR,
        multiplier: MULTIPLIER,
        maxInterval: MAX_INTERVAL_MSEC,
        // 1 minute
        maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
        maxIterations: MAX_ITERATIONS,
        date: Date,
    }; }
    constructor(options = ExponentialBackoff.default) {
        const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date, } = options;
        this.#currentInterval = initialInterval;
        this.#randomizationFactor = randomizationFactor;
        this.#multiplier = multiplier;
        this.#maxInterval = maxInterval;
        this.#date = date;
        this.#startTime = date.now();
        this.#maxElapsedTime = maxElapsedTime;
        this.#maxIterations = maxIterations;
    }
    get ellapsedTimeInMsec() {
        return this.#date.now() - this.#startTime;
    }
    get currentInterval() {
        return this.#currentInterval;
    }
    get count() {
        return this.#count;
    }
    get randomValueFromInterval() {
        const delta = this.#randomizationFactor * this.#currentInterval;
        const min = this.#currentInterval - delta;
        const max = this.#currentInterval + delta;
        return Math.random() * (max - min) + min;
    }
    incrementCurrentInterval() {
        this.#currentInterval = Math.min(this.#currentInterval * this.#multiplier, this.#maxInterval);
        this.#count++;
        return this.#currentInterval;
    }
    next() {
        if (this.ellapsedTimeInMsec >= this.#maxElapsedTime || this.#count >= this.#maxIterations) {
            return null;
        }
        else {
            this.incrementCurrentInterval();
            return this.randomValueFromInterval;
        }
    }
}
/**
 * Utility function to create an exponential backoff iterator.
 * @param options - for the exponential backoff
 * @returns an iterator that yields the next delay in the exponential backoff
 * @yields the next delay in the exponential backoff
 */
export function* exponentialBackoff(options = ExponentialBackoff.default) {
    const backoff = new ExponentialBackoff(options);
    let next = backoff.next();
    while (next) {
        yield next;
        next = backoff.next();
    }
}
//# sourceMappingURL=backoff.js.map