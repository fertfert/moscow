import React, { useState, FormEvent } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { CloseIcon } from './icons/CloseIcon';

interface AuthModalProps {
  onClose: () => void;
  referrerCode: string | null;
}

// Helper to create user profile in Firestore
const createUserProfile = async (user: User, displayName: string, referrerCode: string | null) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    let referredBy = null;
    if (referrerCode) {
      const q = query(collection(db, 'users'), where('referralCode', '==', referrerCode));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        referredBy = querySnapshot.docs[0].id;
      }
    }
    
    const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    await setDoc(userDocRef, {
      displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      referralCode: newReferralCode,
      referredBy: referredBy,
    });
  }
};

const AuthModal: React.FC<AuthModalProps> = ({ onClose, referrerCode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!displayName) {
          setError("Пожалуйста, введите ваше имя.");
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        await createUserProfile(userCredential.user, displayName, referrerCode);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser && result.user.displayName) {
         await createUserProfile(result.user, result.user.displayName, referrerCode);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="flex mb-6 border-b border-slate-200">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`flex-1 py-3 text-lg font-bold ${isLogin ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500'}`}
          >
            Вход
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-lg font-bold ${!isLogin ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500'}`}
          >
            Регистрация
          </button>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">
          {isLogin ? 'С возвращением!' : 'Создать аккаунт'}
        </h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ваше имя"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-400 text-white font-bold py-4 px-10 text-lg rounded-full shadow-md hover:bg-amber-500 transition-colors duration-300 disabled:bg-slate-300"
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="flex-shrink mx-4 text-slate-500">или</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 text-slate-700 font-bold py-3 px-10 rounded-full shadow-sm hover:bg-slate-50 transition-colors duration-300 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          <span>Продолжить с Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;