/**
 * @license MIT
 * @fileoverview
 * Source code for the StateMachine class.
 */

/**
 * A key-map Object containing all state information.
 *
 * @typedef {Object} State
 */
let State;

/**
 * A callback which accepts a `State` as an argument.
 *
 * @typedef {function(State)} StateTransition
 */
let StateTransition;

/**
 * A callback which accepts a `State` as an argument and returns a `Boolean`
 * instructing whether or not to call `update` again.
 *
 * @typedef {function(State)} WhileCondition
 */
let WhileCondition;

/**
 * @abstract
 */
class StateMachine {

    /**
     * @param {State} initialState
     * The initial `State``of this `StateMachine`.
     */
    constructor(initialState = {}) {
        /**
         * @type {State}
         */
        this.state = initialState;
    }

    /**
     * Load a state.
     *
     * @param {State} state
     * Value to load into `state`.
     */
    set(state) {
        this.state = state;
        return this;
    }

    /**
     * Update this machine's state by calling `StateTransition` while
     * `WhileCondition` is `true`.
     *
     * @param {StateTransition} stateTransition
     * A callback which accepts a `State` as an argument. Inside the callback,
     * `this` refers to this Widget.
     *
     * @param {WhileCondition?} whileCondition 
     * A `StateTransition`-like callback. Returns `true` or `false`, indicating
     * whether or not to call `update` again.
     *
     * @param {Number?} maxCalls 
     * The maximum number of times to trigger a state update. Defaults to
     * `Infinity`.
     */
    async transition(
        stateTransition,
        whileCondition,
        maxCalls = Infinity) {

        let i = 0;

        while (
            /** Run at least once. */
            i++ === 0 ||
            /** If < max and a WHILE condition is specified, compute it. */
            (i < maxCalls && whileCondition && whileCondition(this.state))
        ) await stateTransition(this.state);

        return this;
    }

    /**
     * Update this machine's state. Analogous to `setState` in traditional
     * nomenclature.
     *
     * @param {StateTransition} stateTransition 
     * A callback which accepts a `State` as an argument.
     */
    async update(stateTransition) {
        await stateTransition(this.state);
        return this;
    }
}