import test from 'ava';
import fs from 'fs';
import { runInThisContext } from 'vm';

global.requestAnimationFrame = (fn) => setTimeout(fn, 0);
runInThisContext(fs.readFileSync('StateMachine.js'));

test('1 -> 10', async (t) => {
  const machine = new StateMachine({
    a: 1
  })
  
  await machine.transition(
    // transition
    state => state.a++,
    // while
    state => state.a < 10
  );

  t.is(machine.state.a, 10);
});

test('"red" -> "blue"', async (t) => {
  const machine = new StateMachine({
    color: 'red'
  });

  await machine.transition(state => state.color = 'blue');

  t.is(machine.state.color, 'blue');
})