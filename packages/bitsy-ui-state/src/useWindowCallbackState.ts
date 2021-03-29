import EventEmitter from 'eventemitter3';
import { useState, useEffect } from 'react';

type UseWindowCallbackState = <S>(path: string) => any;

const useWindowCallbackState: UseWindowCallbackState = (path) => {
  // Set up the initial state
  const [cb, setCb] = useState(() =>
    window[`__${path}_CALLBACK__`] ? window[`__${path}_CALLBACK__`].current : undefined,
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
        current: () => {},
        emitter: new EventEmitter(),
      };
    }
    // Update the local state
    setCb(() => window[`__${path}_CALLBACK__`].current);
    // Add a listener to the created emitter
    // We want to listen for any changes
    // These could come from the outside or from within
    window[`__${path}_CALLBACK__`].emitter.addListener('change', handleStateChange);
    // Clean up and remove subscription
    return () => {
      window[`__${path}_CALLBACK__`].emitter.removeListener('change', handleStateChange);
    };
  }, []);
  // What happens if someone else changes?
  return cb;
};

export default useWindowCallbackState;
