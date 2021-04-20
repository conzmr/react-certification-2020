import React from 'react';
import Spinner from '../Spinner';

function LoadingOverlay({
  title = 'Loading...',
  subtitle = "This may take a few seconds, please don't close this page.",
  spinColor,
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <Spinner color={spinColor} />
      <h2 className="text-center text-white text-xl font-semibold">{title}</h2>
      <p className="w-1/3 text-center text-white">{subtitle}</p>
    </div>
  );
}

export default LoadingOverlay;
