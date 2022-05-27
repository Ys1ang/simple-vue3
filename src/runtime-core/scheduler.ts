const queue: any[] = []
let isFLusPending = false;
const p = Promise.resolve();

export function nextTick(fn) {
    return fn ? p.then(fn) : p;
}

function queueFlush() {
    if (isFLusPending) return;
    isFLusPending = true
    nextTick(FlushJob)
}

function FlushJob() {
    isFLusPending = false
    let job
    while ((job = queue.shift())) {
        job && job();
    }
};

export function queueJobs(job) {
    if (!queue.includes(job)) {
        queue.push(job)
    }
    queueFlush()
}


