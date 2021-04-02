import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  border-top-color: ${props => props.spinColor};
`;

function LoadingOverlay({
    title='Loading...',
    subtitle='This may take a few seconds, please don\'t close this page.',
    spinColor = '#3498db'
    }) {
    return <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	    <StyledSpinner spinColor={spinColor} className="animate-spin ease-linear rounded-full border-4 border-t-4 h-12 w-12 mb-4"></StyledSpinner>
	        <h2 className="text-center text-white text-xl font-semibold">{title}</h2>
	        <p className="w-1/3 text-center text-white">{subtitle}</p>
    </div>
}

export default LoadingOverlay;