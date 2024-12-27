import React, { useEffect, useState } from 'react';
import './index.css';

const baseStyle = {
  width: '120px',
  height: '40px',
  margin: '0 10px',
  lineHeight: '40px',
  fontSize: '20px',
  borderRadius: '20px',
};

const non_movingStyle = {
  ...baseStyle,
  opacity: 0,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Word = ({
  word,
  isChecked,
  timeLimit,
  interval,
  addFallingWords,
  popFallingWords,
}) => {
  const [isTyped, setIsTyped] = useState(false);
  const [position, setPosition] = useState(0);

  const movingStyle = {
    ...baseStyle,
    transform: `translateY(${position}vh)`,
    backgroundColor: 'skyblue',
    opacity: position === 0 ? 0 : 1,
    transition: `opacity 0.5s, transform ${timeLimit}s linear`,
  };

  useEffect(() => {
    if (isChecked) {
      setIsTyped(true);
      setPosition(0); // Stop current word from falling
      popFallingWords(word);
    }
  }, [isChecked]);

  useEffect(() => {
    const moveWord = async () => {
      await delay(interval * 1000); //Falling 시작
      setPosition(70);
      addFallingWords(word);
      await delay(timeLimit * 1000); //Falling 끝
      popFallingWords(word); //땅에 떨어짐
    };
    moveWord();
  }, []);

  return isTyped ? (
    <div style={non_movingStyle}></div>
  ) : (
    <div style={movingStyle}>{word}</div>
  );
};
