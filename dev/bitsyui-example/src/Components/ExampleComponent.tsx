import React, { useCallback, useState } from 'react';

const ExampleComponent = (props) => {
  const [message, setMessage] = useState('Hello');
  const doClick = useCallback(() => {
    setMessage('Welcome');
  }, [setMessage]);
  return (
    <div onClick={doClick}>
      {message} {props?.rah}
    </div>
  );
};

export default ExampleComponent;
