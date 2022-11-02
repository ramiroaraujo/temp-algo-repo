const fs = require('fs');

const solution = (path_size) => {
    const data = fs.readFileSync('paths.txt', 'utf8').replaceAll('p', '')

    //parse paths as array of arrays of paths
    const paths = data
        .split('\n')
        .map(p => p.split(','))
        .filter(p => p.length >= path_size) //filter out shorter paths @fix bug replaced > with >=

    //store occurrences in map
    const occurrences = new Map();

    //iteration
    paths.forEach(p => {
        // @fix bug replaced > with >=
        for (let i = 0; i <= p.length - path_size; i++) {
            const split = p.slice(i, i + path_size).join(',')

            if (occurrences.has(split)) continue;

            let offset = 0;
            let count = 0;
            let indexOf = data.indexOf(split, offset);
            while (indexOf > -1) {
                const before = data.charAt(indexOf - 1)
                const after = data.charAt(indexOf + split.length)
                if (['', ',', '\n'].includes(before) && ['', ',', '\n'].includes(after)) {
                    count++;
                    offset = indexOf + split.length;
                } else {
                    offset = indexOf + 1;
                }
                indexOf = data.indexOf(split, offset + 1);
            }

            occurrences.set(split, count);
        }
    })


    //get all entries, sort by occurence
    const entries = [...occurrences.entries()]
        .sort((a, b) => a[1] - b[1])

    //get the path that appeared the most
    //the top five would be as simple as getting the last 5
    const most_common = entries.pop();

    const num_occurrences = most_common[1];
    const path = most_common[0].split(',').map(p => `p${p}`).join(',');
    return `The most common ${path_size}-page path is ${path} with ${num_occurrences} occurrences`;
}

// console.log(solution(3));


for (let i = 2; i < 12; i++) {
    console.time(`runs for ${i} interations`);
    console.log(solution(i));
    console.timeEnd(`runs for ${i} interations`);
    console.log('-----------------------------');
}