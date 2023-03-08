import React from 'react';

const hello = (name: string): string => {
  return `Hello ${name}`;
};

const TypeErrorTest = () => {
  hello('11111');
  return <>1</>;
};

export default TypeErrorTest;
