import React, { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import Header from './components/Header';
import MainSection from './components/MainSection';
import ReferralSection from './components/ReferralSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  referralCode: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [referrerCode, setReferrerCode] = useState<string | null>(null);

  useEffect(() => {
    // Check for referral code in URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferrerCode(refCode);
    }

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', userAuth.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCurrentUser({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
            referralCode: userData.referralCode,
          });
        } else {
          console.warn("User profile not found in Firestore, this might be an old user or an error.", userAuth.uid);
          // Create a temporary profile for display
           setCurrentUser({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
            referralCode: 'GENERATING...',
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-2xl text-amber-600">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-between font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        <Header 
          currentUser={currentUser}
          onAccountClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
        <MainSection />
        {currentUser && <ReferralSection currentUser={currentUser} />}
      </div>
      <Footer />
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          referrerCode={referrerCode}
        />
      )}
    </div>
  );
}

export default App;