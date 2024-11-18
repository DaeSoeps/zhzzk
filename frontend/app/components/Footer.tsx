import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-400 py-4 px-6 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* 저작권 정보 */}
        <p className="text-sm">
          copyright © {new Date().getFullYear()} My Streaming App. All rights reserved by DaeSoeps.
        </p>

        {/* 출처 및 링크 */}
        <div className="flex space-x-4 mt-2 sm:mt-0">
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