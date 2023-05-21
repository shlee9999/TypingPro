import React, { useEffect } from 'react';
import VirtualKeyboard from '../../../components/VirtualKeyboard';
import Logo from '../../../images/logo.png';
import './index.css';
import { useState } from 'react';
import UserInfo from '../../../components/UserInfo';
import UserInfoInput from '../../../components/UserInfoInputModal';
import { TypingResultsContainer } from '../../../components/TypingResultsContainer';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { TypingResultsModal } from '../../../components/TypingResultsModal';
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export const MainSection = () => {
  const [viewUserInfoInputPopup, setViewUserInfoInputPopup] = useState(true);
  const [viewTypingResultPopup, setViewTypingResultPopup] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(100);

  const closeUserInfoInputPopup = () => {
    setViewUserInfoInputPopup(false);
  };

  const showTypingResultPopup = () => {
    setViewTypingResultPopup(true);
  };

  const closeTypingResultPopup = () => {
    setViewTypingResultPopup(false);
  };

  const handleTypingSpeedChange = (speed) => {
    setTypingSpeed(speed);
  };

  const handleTypingAccuracyChange = (accuracy) => {
    setTypingAccuracy(accuracy);
  };

  return (
    <div className='typing_page_main'>
      <div className='left_container'>
        <img src={Logo} className='typing_page_logo' alt='logo' />
        <VirtualKeyboard
          onTypingSpeedChange={handleTypingSpeedChange}
          onTypingAccuracyChange={handleTypingAccuracyChange}
          viewTypingResultPopup={viewTypingResultPopup}
          showTypingResultPopup={showTypingResultPopup}
          setTypingSpeed={setTypingSpeed}
          setTypingAccuracy={setTypingAccuracy}
        />
      </div>
      <div className='right_container'>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <UserInfo viewUserInfoInputPopup={viewUserInfoInputPopup} />
=======
        <UserInfo viewPopup={viewPopup} />
>>>>>>> Stashed changes
=======
        <UserInfo viewPopup={viewPopup} />
>>>>>>> Stashed changes
        <TypingResultsContainer
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
      </div>
      {viewUserInfoInputPopup && (
        <UserInfoInput
          viewUserInfoInputPopup={viewUserInfoInputPopup}
          closeUserInfoInputPopup={closeUserInfoInputPopup}
        />
      )}
      {viewTypingResultPopup && (
        <TypingResultsModal
          closeTypingResultPopup={closeTypingResultPopup}
          typingSpeed={typingSpeed}
          typingAccuracy={typingAccuracy}
        />
      )}
    </div>
  );
};
