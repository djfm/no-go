function decompose (revision) {
    var [normalPart, preReleasePart] = revision.split(/-(.+)?/);

    var numbers = normalPart.split('.').map(n => {
        var number = parseInt(n, 10);
        return isNaN(number) ? 0 : number;
    });

    return {
        numbers,
        preReleasePart
    };
}

function pad (x, y) {
    var delta = y.numbers.length - x.numbers.length;
    if (delta < 0) {
        [x, y, delta] = [y, x, -delta];
    }
    for (var i = 0; i < delta; ++i) {
        x.numbers.push(0);
    }
}

export default function compareRevisions (a, b) {

    var x = decompose(a), y = decompose(b);
    pad(x, y);

    for (var i = 0; i < x.numbers.length; ++i) {
        if (x.numbers[i] < y.numbers[i]) {
            return -1;
        } else if (x.numbers[i] > y.numbers[i]) {
            return 1;
        }
    }

    if (x.preReleasePart && !y.preReleasePart) {
        return -1;
    } else if (y.preReleasePart && !x.preReleasePart) {
        return 1;
    } else if (x.preReleasePart < y.preReleasePart) {
        return -1;
    } else if (y.preReleasePart < x.preReleasePart) {
        return 1;
    } else {
        return 0;
    }

    return 0;
}
