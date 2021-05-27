import { useState, useCallback, useEffect } from 'react';

export type RenderComponent = (ref: React.MutableRefObject<Element | null>, name: string, props: any) => void;

/*
  useBitsyUI Hook
  Use this hook to embed a bitsy UI component into a primary application
  the hook will handle both loading the library and returning the callbacks to render bitsy UI components
  @param baseUrl = the url to the bitsy UI ie http://examplebitsyui.com
  @param libraryName = the UMD library name
 */
export type UseBitsyUI = (
  baseUrl: string,
  libraryName: string,
) => [
  null | any,
  boolean,
  false | React.Dispatch<React.SetStateAction<boolean>>,
  false | React.Dispatch<React.SetStateAction<boolean>>,
  any,
];

const useBitsyUI: UseBitsyUI = (baseUrl, libraryName) => {
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [bootstrapLoaded, setBootstrapLoaded] = useState(false);
  const [bootstrapError, setBootstrapError] = useState(false);
  // If document does not exist
  if (typeof document === 'undefined') return [null, false, false, false, null];
  // Checks if the bitsy UI script is present
  const hasBootstrapScript = useCallback(() => {
    // We want to check for both the script and the window object
    // This is in case the script was included somewhere without the id we expect
    return !!document?.getElementById(`${libraryName}Library`) || window[libraryName];
  }, [baseUrl, libraryName]);
  // Loads the bitsy UI script
  const addBootstrapScript = useCallback(() => {
    const tag = document?.createElement('script');
    tag.id = `${libraryName}Library`;
    tag.src = `${baseUrl}/bootstrap.js`;
    tag.onload = () => setBootstrapLoaded(true);
    tag.onerror = (e) => setBootstrapError(true);
    document?.getElementsByTagName('head')[0].appendChild(tag);
  }, [baseUrl, libraryName]);
  // Handle the bitsy UI emitting a loaded event
  const handleBitsyUILoadEvent = useCallback((e) => {
    // Since all bitsy UIs emit a bitsyUILoaded custom event we need to check this is the one we are after
    if (e.detail.name === libraryName) {
      setLibraryLoaded(true);
    }
  }, []);
  // Use the bitsy UI's exported render helper to render the actual component
  const renderComponent: RenderComponent = useCallback(
    (ref, name, props) => {
      if (window[libraryName] && window[libraryName].Render) {
        window[libraryName].Render(ref, name, props);
      }
    },
    [libraryLoaded],
  );
  // Listen for the BitsyUI to emit that it has fully loaded
  // This has to happen in order to allow for the bitsy UI to load all assets within the manifest
  useEffect(() => {
    // If the library has already been detected as loaded and has environment vars
    if (window[libraryName] && window[`__BitsyUI${libraryName}AssetURL__`]) {
      setLibraryLoaded(true);
    }
    // Setup the listener against the window event space AND return a cleanup event remover
    window.addEventListener('bitsyUILoaded', handleBitsyUILoadEvent);
    return () => {
      window.removeEventListener('bitsyUILoaded', handleBitsyUILoadEvent);
    };
  }, []);
  // If the library bootstrap has not been detected then we have to initiate the script loading
  // This is where the bootstrap.js is loaded and not the actual assets within manifest.js
  // Manifest.js assets are loaded within the bootstrap.js and a custom bitsyUILoaded window event is emitted on completion
  if (!bootstrapLoaded && !bootstrapError && !hasBootstrapScript()) {
    addBootstrapScript();
  }
  // If the library is loaded then return the render helper, the various loaded flags and the library itself
  // Otherwise return all nulls and falses
  return libraryLoaded
    ? [renderComponent, libraryLoaded, setBootstrapLoaded, setBootstrapError, window[libraryName]]
    : [null, false, false, false, null];
};

export default useBitsyUI;
