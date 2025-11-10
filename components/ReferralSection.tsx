import React, { useState } from 'react';
import { ShareIcon } from './icons/ShareIcon';
import { UserProfile } from '../App';

interface ReferralSectionProps {
  currentUser: UserProfile;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ currentUser }) => {
  const [copied, setCopied] = useState(false);

  if (!currentUser?.referralCode) {
    return null;
  }

  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${currentUser.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="w-full max-w-2xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8 text-center mb-12 md:mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Пригласи друга и получи бонус!</h2>
      <p className="text-slate-600 mb-6">
        Поделитесь своей реферальной ссылкой. Ваш друг получит скидку на наши услуги, а вы - бонус на свой счет.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full sm:flex-1 bg-slate-100 text-slate-700 rounded-lg px-4 py-3 border-transparent focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-slate-900 transition-colors duration-300"
        >
          <ShareIcon className="w-5 h-5" />
          <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
        </button>
      </div>
    </section>
  );
};

export default ReferralSection;