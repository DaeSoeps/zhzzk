import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-400 py-4 px-6 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-end mx-0 items-center">
        {/* 저작권 정보 */}
        <p className="text-sm mx-6">
          copyright © {new Date().getFullYear()} My Streaming App. All rights reserved by DaeSoeps.
        </p>
        <p className="text-sm mx-6">
        Version 0.0.1
        </p>
        {/* 출처 및 링크 */}
        <div className="flex space-x-4 mt-2 sm:mt-0 mx-6">
          <a
            href="https://icons8.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            Icons by Icons8
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;