export function MillisToMinutesAndSeconds(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    seconds = (seconds.length === 1 ? '0' : '') + seconds;
    return minutes + ':' + seconds;
}

export function MillisToMinutesAndSecondsVerbose(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var str = '';
    if (minutes) {
        str += minutes + ' min ';
    }
    return str + seconds + ' seconds';
}

export type Duration = {
    days: number;
    hours: number;
    minutes: number;
};

export function MillisToDaysHoursMinSeconds(t: number): Duration {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function (n: number) {
            return n < 10 ? 0 + n : n;
        };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return {
        days: d,
        hours: pad(h),
        minutes: pad(m),
    };
}
