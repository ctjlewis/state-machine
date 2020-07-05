/**
 * A key-map Object containing all state
 * information.
 * 
 * @typedef {Object} State
 */
let State;

/**
 * A callback which accepts a `State` as an
 * argument.
 * 
 * @typedef {function(State)} StateTransition
 */
let StateTransition;

/**
 * A callback which accepts a `State` as an
 * argument and returns a `Boolean` instructing
 * whether or not to call `update` again.
 * 
 * @typedef {function(State)} WhileCondition
 */
let WhileCondition;

/**
 * 
 * @interface
 */
class StateMachine {

    /**
     * 
     * @param {State} initialState
     * The initial `State``of the `StateMachine`.
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
    init(state) {
        this.state = state;
        return this;
    }

    /**
     * Update this machine's state with the
     * `StateTransition` until `TransitionCondition`
     * fails.
     * 
     * @param {StateTransition} stateTransition
     * A callback which accepts a `State` as an argument.
     * Inside the callback, `this` refers to this Widget.
     * 
     * @param {WhileCondition} whileCondition
     * A `StateTransition`-like callback. Returns `true`
     * or `false`, indicating whether or not to call
     * `update` again.
     * 
     * @param {Number} maxCalls
     * The maximum number of times to trigger a state
     * update. Defaults to `Infinity`.
     */
    transition(
        stateTransition,
        whileCondition,
        maxCalls = Infinity
    ) {

        let i = 0;
        while (
            whileCondition
            && whileCondition(this.state)
            && i++ < maxCalls
        ) stateTransition(this.state);

        return this;
    }

    /**
     * Update this machine's state. Analogous to
     * `setState` in traditional nomenclature.
     * 
     * @param {StateTransition} stateTransition
     * A callback which accepts a `State` as an argument.
     * Inside the callback, `this` refers to this 
     * `StateMachine`.
     */
    update(stateTransition) {
        stateTransition(this.state);
        return this;
    }
}