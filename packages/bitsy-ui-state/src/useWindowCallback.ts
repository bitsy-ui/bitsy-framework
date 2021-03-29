import EventEmitter from 'eventemitter3';
import { useState, useEffect, useCallback } from 'react';

type UseWindowCallback = <S>(defaultCallback: (...args: any[]) => any, deps: any[], path: string) => any;

const useWindowCallback: UseWindowCallback = (defaultCallback, deps, path) => {
  // Create the usecallback callback
  const callback = useCallback(defaultCallback, deps);
  // Set up the initial state
  const [cb, setCb] = useState(() =>
    window[`__${path}_CALLBACK__`] ? window[`__${path}_CALLBACK__`].current : callback,
  );
  // Callback to handle the update of the state
  const handleStateChange = (_cb) => {
    // Ensure that the new state isn't just the same we have previously stored
    if (_cb === cb) return undefined;
    // Update the local state
    setCb(() => _cb);
  };
  // On initiate we want to either create a new emitter or listen to the current one
  useEffect(() => {
    // If no window state has yet been set up
    if (!window[`__${path}_CALLBACK__`]) {
      // Set up the window emitter
      window[`__${path}_CALLBACK__`] = {
        current: callback,
        emitter: new EventEmitter(),
      };
    }
    // Add a listener to the created emitter
    // We want to listen for any changes
    // These could come from the outside or from within
    window[`__${path}_CALLBACK__`].emitter.addListener('change', handleStateChange);
    // Clean up and remove subscription
    return () => {
      window[`__${path}_CALLBACK__`].emitter.removeListener('change', handleStateChange);
    };
  }, []);
  // What happens if I change?
  useEffect(() => {
    // Ensure we are not just trying to redispatch the same thing
    if (window[`__${path}_CALLBACK__`].current === callback) return undefined;
    // Update the current state
    window[`__${path}_CALLBACK__`].current = callback;
    // Emit the change
    window[`__${path}_CALLBACK__`].emitter.emit('change', callback);
  }, [callback]);
  // What happens if someone else changes?
  return cb;
};

export default useWindowCallback;
