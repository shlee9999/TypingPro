import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import sentence_english from 'constants/sentence_english.json';
import sentence_korean from 'constants/sentence_korean.json';

const SelectCategoryModal = ({
  openAcidRainModal,
  closeModal,
  selectCategory,
  startGame,
  language,
  toggleLanguage,
  toggleMode,
  typingMode,
}) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0);
  const [focusedMode, setFocusedMode] = useState('sentence');
  const buttonRef = useRef(null);
  const sentence_total = language ? sentence_english : sentence_korean;

  const handleKeyDown = ({ nativeEvent: { key } }) => {
    switch (key) {
      case 'ArrowUp':
        if (focusedCategoryIndex <= 0) {
          setFocusedCategoryIndex(4);
          return;
        }
        setFocusedCategoryIndex((prev) => prev - 1);
        return;
      case 'ArrowDown':
        if (focusedCategoryIndex === 4) {
          setFocusedCategoryIndex(0);
          return;
        }
        setFocusedCategoryIndex((prev) => prev + 1);
        return;
      case 'ArrowLeft': //한국어로 전환
        toKorean();
        return;
      case 'ArrowRight':
        toEnglish();
        return;
      case 'Enter':
        handleClickStart();
        return;
      case 'Escape':
        closeModal();
        return;
      default:
        break;
    }
  };
  const handleClickStart = () => {
    if (focusedMode === 'game') openAcidRainModal();
    else startGame();
  };
  const onClickModal = (e) => {
    e.stopPropagation();
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  };
  const handleFocusCategory = (index) => () => {
    setSentenceIndex(index);
    selectCategory(index);
    setFocusedCategoryIndex(index);
  };
  const handleFocusMode = (mode) => {
    setFocusedMode(mode);
  };

  const toSentenceMode = () => {
    if (focusedMode === 'sentence') return;
    // if (!typingMode) return;
    toggleMode();
    handleFocusMode('sentence');
  };
  const toWordMode = () => {
    if (focusedMode === 'word') return;
    // if (typingMode) return;
    toggleMode();
    handleFocusMode('word');
  };
  const onClickAcidRainButton = () => {
    handleFocusMode('game');
  };

  const toKorean = () => {
    if (!language) return;
    toggleLanguage();
    setSentenceIndex(0);
  };
  const toEnglish = () => {
    if (language) return;
    toggleLanguage();
    setSentenceIndex(0);
  };

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [language]);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [focusedCategoryIndex]);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, [focusedMode]);

  useEffect(() => {
    if (typingMode) toggleMode();
  }, []);

  const renderCategory = (mode) => {
    if (mode === 'game')
      return (
        <div className='category_wrapper'>
          <div className='acid_rain_title_typo'>설 명</div>
          <div className='acid_rain_description'>
            <div className='acid_rain_description_typo'>
              소나기 게임은 사용자가 단어를 맞추는 게임입니다. 단어들이 화면에서
              떨어지고, 사용자는 해당 단어를 입력하여 맞추어야 합니다. 단어들이
              화면에 나타나고, 사용자는 단어가 떨어지기 전에 정확히 입력하여
              맞추어야 합니다. 맞춘 단어는 화면에서 사라지며 점수가 올라갑니다.
            </div>
            <div className='acid_rain_description_typo'>
              빠르고 정확한 반응이 요구되는 게임으로, 사용자의 타이핑 능력을
              향상시킬 수 있습니다. 플레이해보세요!
            </div>
          </div>
        </div>
      );
    const data =
      mode === 'word' ? sentence_total.word : sentence_total.sentence;
    return (
      <div className='category_wrapper'>
        <div className='select_language'>
          <button
            className={`select_language_item select_item ${
              language && 'item_active'
            }`}
            onClick={toKorean}
          >
            한글
          </button>
          <button
            className={`select_language_item select_item ${
              !language && 'item_active'
            }`}
            onClick={toEnglish}
          >
            English
          </button>
        </div>
        {data.map((item, index) => (
          <button
            className={`category_item ${
              index === sentenceIndex && 'select_sentence'
            }`}
            key={`${language}_category_${index}`}
            onFocus={handleFocusCategory(index)}
            onKeyDown={handleKeyDown}
            ref={index === focusedCategoryIndex ? buttonRef : null}
          >
            {item.title}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='modal_overlay' onClick={closeModal}>
      <div className='modal' onClick={onClickModal}>
        <div className='header_title'>
          Please choose a typing sentence category
        </div>
        <div className='select_typing_mode'>
          <button
            className={`select_mode_item select_item ${
              focusedMode !== 'sentence' && 'item_active'
            }`}
            onClick={toSentenceMode}
          >
            긴 글 연습
          </button>
          <button
            className={`select_mode_item select_item ${
              focusedMode !== 'word' && 'item_active'
            }`}
            onClick={toWordMode}
          >
            단어 연습
          </button>
          <button
            className={`select_mode_item select_item ${
              focusedMode !== 'game' && 'item_active'
            }`}
            onClick={onClickAcidRainButton}
          >
            소 나 기
          </button>
        </div>
        <div className='select_mode_child_wrapper'>
          {renderCategory(focusedMode)}
        </div>
        <button className='modal_start_button' onClick={handleClickStart}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default SelectCategoryModal;
