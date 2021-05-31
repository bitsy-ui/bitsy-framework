import React, { useCallback, useState } from 'react';

const ExampleComponent = (props) => {
  const [message, setMessage] = useState('Hello');
  const doClick = useCallback(() => {
    setMessage('Welcome to rahly');
  }, [setMessage]);
  return (
    <div onClick={doClick}>
      {message} {props?.rah} Blah Me
    </div>
  );
};

export default ExampleComponent;
