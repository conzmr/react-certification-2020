import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section>
      <img src="sad-watermelon.png" alt="Page Not Found" />
      <p className="text-center text-4xl text-gray-500 dark:text-white">
        404 - Page Not Found
      </p>
      <Link to="/" className="flex justify-center text-green-600 mt-2">
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
