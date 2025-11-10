import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { Logo } from './Logo';
import { UserProfile } from '../App'; // Import UserProfile

interface HeaderProps {
  onAccountClick: () => void;
  currentUser: UserProfile | null; // Use UserProfile type
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAccountClick, currentUser, onLogout }) => {
  return (
    <header className="text-center w-full flex flex-col items-center mb-12 md:mb-16">
      <Logo className="mb-6" />

      <p className="text-xl md:text-2xl font-medium text-amber-600 mb-6">
        Пусть жизнь будет в кайф!
      </p>
      
      <p className="max-w-xl text-slate-600 mb-8">
        Мы команда Moscow Life! Поможем Вам найти жилье(квартиру/студию/комнату/койко-место) от собственника, или разместить объявление о сдачи в аренду!
      </p>

      {currentUser ? (
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          <p className="text-slate-700 text-lg">
            Привет, <span className="font-bold">{currentUser.displayName || currentUser.email}</span>!
          </p>
          <button 
            onClick={onLogout}
            className="w-full bg-slate-800 text-white font-bold py-4 px-10 text-lg rounded-full shadow-md hover:bg-slate-900 transition-colors duration-300 ease-in-out"
          >
            Выйти
          </button>
        </div>
      ) : (
        <button 
          onClick={onAccountClick}
          className="w-full max-w-md bg-white border-2 border-amber-400 text-amber-500 font-bold py-6 px-12 text-xl rounded-full shadow-md hover:bg-amber-50 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-4 group"
        >
          <span>АККАУНТ</span>
          <ArrowRightIcon className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      )}
    </header>
  );
};

export default Header;