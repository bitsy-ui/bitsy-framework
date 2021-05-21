import React, { useCallback, useState } from 'react';

const ExampleComponent = (props) => {
  const [message, setMessage] = useState('Hello');
  const doClick = useCallback(() => {
    setMessage('Welcome to rah');
  }, [setMessage]);
  return (
    <div onClick={doClick}>
      {message} {props?.rah} Blah
    </div>
  );
};

export default ExampleComponent;
