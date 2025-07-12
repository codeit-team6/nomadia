import React from 'react';
import { useEffect, useState } from 'react';
// unused import

// 잘못된 포맷팅과 여러 ESLint 에러들
const TestComponent = () => {
  const [count, setCount] = useState(0);
  const unusedVariable = 'this will cause error';
  const [data, setData] = useState(null);

  // missing dependency in useEffect
  useEffect(() => {
    console.log(count);
  }, []);

  // accessibility issue - div with click without keyboard support
  const handleClick = () => {
    setCount(count + 5);
  };

  // improper formatting and unused variable
  const badObject = {
    name: 'test',
    value: 123,
    items: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  };

  return (
    <div>
      <div onClick={handleClick}>Click me: {count}</div>

      {/* Missing alt attribute */}
      <img src="/test.jpg" />

      {/* Label without associated control */}
      <label>Username</label>
      <input type="text" />

      {/* Unused variable will cause warning */}
      <p>Hello World</p>
    </div>
  );
};

export default TestComponent;
