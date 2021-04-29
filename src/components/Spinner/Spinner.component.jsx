import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  border-top-color: ${(props) => props.color};
`;

export default function Spinner({ color = '#3498db', size = 12, className }) {
  return (
    <StyledSpinner
      color={color}
      className={`animate-spin ease-linear rounded-full border-4 border-t-4 h-${size} w-${size} ${className}`}
    />
  );
}
