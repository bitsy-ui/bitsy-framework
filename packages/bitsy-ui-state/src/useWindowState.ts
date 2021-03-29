import EventEmitter from 'eventemitter3';
import { useState, useEffect, SetStateAction } from 'react';

type UseWindowState = <S>(defaultState: S, path: string) => [S, React.Dispatch<SetStateAction<S>>];

const useWindowState: UseWindowState = (defaultState, path) => {
  // Set up the initial state
  const [state, setState] = useState(window[`__${path}_STATE__`] ? window[`__${path}_STATE__`].current : defaultState);
  // Callback to handle the update of the state
  const handleStateChange = (_state) => {
    // Ensure that the new state isn't just the same we have previously stored
    if (JSON.stringify(_state) === JSON.stringify(state)) return undefined;
    // Update the local state
    setState(_state);
  };
  // On initiate we want to either create a new emitter or listen to the current one
  useEffect(() => {
    // If no window state has yet been set up
    if (!window[`__${path}_STATE__`]) {
      // Set up the window emitter
      window[`__${path}_STATE__`] = {
        current: window[`__${path}_STATE__`] ? window[`__${path}_STATE__`].current : defaultState,
        emitter: new EventEmitter(),
      };
    }
    // Ensure the state is up to date with the default at this stage
    setState(window[`__${path}_STATE__`].current);
    // Add a listener to the created emitter
    // We want to listen for any changes
    // These could come from the outside or from within
    window[`__${path}_STATE__`].emitter.addListener('change', handleStateChange);
    // Clean up and remove subscription
    return () => {
      window[`__${path}_STATE__`].emitter.removeListener('change', handleStateChange);
    };
  }, []);
  // What happens if I change?
  useEffect(() => {
    // Ensure we are not just trying to redispatch the same thing
    if (JSON.stringify(window[`__${path}_STATE__`].current) === JSON.stringify(state)) return undefined;
    // Update the current state
    window[`__${path}_STATE__`].current = state;
    // Emit the change
    window[`__${path}_STATE__`].emitter.emit('change', state);
  }, [state]);
  // What happens if someone else changes?
  return [state, setState];
};

export default useWindowState;
