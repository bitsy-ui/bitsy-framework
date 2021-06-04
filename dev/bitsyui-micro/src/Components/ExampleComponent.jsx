import React, { useCallback, useState } from 'react';

const ExampleComponent = (props) => {
  const [message, setMessage] = useState('Hello');
  const doClick = useCallback(() => {
    setMessage('Welcome to to the example micro frontend');
  }, [setMessage]);
  return (
    <div onClick={doClick}>
      {message} {props?.rah} Example Component Cat
    </div>
  );
};

export default ExampleComponent;
