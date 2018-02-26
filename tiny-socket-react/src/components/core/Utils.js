import React from 'react';

export const Stringify = (props) => {
  return (
    <div>
      {JSON.stringify(props.children)}
    </div>
  );
}
