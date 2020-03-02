import React from 'react';

export const rendeTableHeader = headerField => {
  const result = headerField.length
    ? headerField.map((item, index) => (
      <th key={index} className="border-top-0">
          {item}
        </th>
      ))
    : null;

  return (
    <thead>
      <tr>{result}</tr>
    </thead>
  );
};
