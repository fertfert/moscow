import React from 'react';

const MainSection: React.FC = () => {
  return (
    <main className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-12 md:mb-20">
      <a
        href="https://tally.so/r/3Ey154"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-auto text-center text-lg bg-amber-400 text-white font-bold py-6 px-12 rounded-full shadow-lg hover:bg-amber-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        Найти Жилье
      </a>
      <a
        href="https://tally.so/r/mBMGOR"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-auto text-center text-lg bg-slate-800 text-white font-bold py-6 px-12 rounded-full shadow-lg hover:bg-slate-900 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        Сдать в аренду
      </a>
    </main>
  );
};

export default MainSection;
