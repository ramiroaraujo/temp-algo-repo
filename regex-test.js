const fs = require('fs');

const solution = (path_size) => {
    const data = fs.readFileSync('paths.txt', 'utf8').replaceAll('p','')

    //parse paths as array of arrays of paths
    const paths = data
        .split('\n')
        .map(p => p.split(','))
        .filter(p => p.length >= path_size) //filter out shorter paths @fix bug replaced > with >=

    //store occurrences in map
    const occurrences = {}

    //iteration
    paths.forEach((p, i) => {
        // @fix bug replaced > with >=
        for (let i = 0; i <= p.length - path_size; i++) {
            const split = p.slice(i, i + path_size).join(',')

            if (occurrences[split]) continue;

            //full string regexp option
            const re = RegExp(`(?:^|,)${split}(?:$|,)`, 'gm')
            const count = data.match(re)?.length || 0

            occurrences[split] = count;
        }
    })


    //get all entries, sort by occurence
    const entries = Object
        .entries(occurrences)
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