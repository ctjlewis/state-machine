// uncomment for Node
const {performance} = require('perf_hooks');

function test(callback) {
    let start = performance.now(),
        total = 0;

    // call callback, add to total
    for (let i = 0; i < 1e6; i++)
        total += callback(i, i + 1);

    const time = performance.now() - start;
    console.log(`took ${time.toFixed(2)}ms | total: ${total}`);
}

console.log('FIRST CALLBACK: FASTER');
for (let i = 1; i < 10; i++)
    test((a, b) => a + b);

console.log('\nNEW CALLBACK: SLOWER');
for (let i = 1; i < 10; i++)
    test((a, b) => a + b);