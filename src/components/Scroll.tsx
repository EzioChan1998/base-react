import React, { useEffect, memo } from 'react';

const arr = new Array<number>(40).fill(0).map((item, index) => index);

const Scroll = (
  props: { testObj: Record<any, any>; text?: string } = {
    testObj: {},
    text: ''
  }
) => {
  const { testObj, text } = props;

  useEffect(() => {
    console.log(`11111111111${text}`);
  }, [props]);

  useEffect(() => {
    console.log(`22222222222${text}`);
  }, [props.testObj]);

  useEffect(() => {
    console.log(`33333333333${text}`);
  }, [testObj]);

  return (
    <>
      <div
        style={{
          width: '800px',
          height: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        {arr.map((item) => (
          <div
            style={{
              width: '100px !important',
              height: '100%',
              background: 'orange',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            the {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(Scroll);
