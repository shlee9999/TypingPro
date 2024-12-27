import ExitButton from 'assets/ExitButton.svg';
import rain_sound from 'assets/sounds/Rain.mp3';
import water_drop from 'assets/sounds/WaterDrop.wav';
import WordRow from 'components/AcidRain/WordRow';
import { WORDS, levelList } from 'constants/acidRainContents';
import { useEffect, useRef, useState } from 'react';
import {
  chunkArray,
  getFormattedDate,
  getLevelInfo,
  getShuffledIndexArray,
} from 'utils/helper';
import AcidRainResultModal from '../AcidRainResultModal';
import { AcidRainStatisticsModal } from '../AcidRainStatisticsModal';
import './index.css';

const RainSound = new Audio(rain_sound);
const WaterDrop = new Audio(water_drop);

let shuffledWordIndexes = getShuffledIndexArray(WORDS); //다음 게임 시 초기화
let lastWord = WORDS[shuffledWordIndexes.indexOf(WORDS.length - 1)]; //게임 끝내기 위해 필요

export const AcidRainModal = ({ closeAcidRainModal, userName }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [checkedWords, setCheckedWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [level, setLevel] = useState(1);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [fallingWords, setFallingWords] = useState([]);
  const { columns, timeLimit, interval } = getLevelInfo(level);

  const chunkedShuffledWordIndexes = chunkArray(shuffledWordIndexes, columns); //LENGTH개의 원소로 나눔
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const handleClickModal = (e) => {
    buttonRef.current?.focus();
    e.stopPropagation();
  };
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

  const handleStatisticsModalOpen = () => {
    setIsStatisticsModalOpen(true);
  };
  const handleClickOutside = () => {
    if (isStatisticsModalOpen) return;
    if (!isStarted) closeAcidRainModal();
  };
  const addFallingWords = (word) => {
    if (!fallingWords.includes(word))
      setFallingWords((prev) => [...prev, word]);
  };

  const popFallingWords = (word) => {
    if (word === lastWord) {
      setIsResultModalOpen(true);
      setIsStarted(false);
    }
    setFallingWords((prev) => prev.filter((prevWord) => prevWord !== word));
  };

  const onClickExitButton = () => {
    closeAcidRainModal();
    RainSound.pause();
    RainSound.currentTime = 0;
  };
  const handleInputKeyDown = ({ key }) => {
    switch (key) {
      case 'Enter':
        handleEnter();
        return;
      default:
        break;
    }
  };
  const handleButtonKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowUp': //한국어로 전환
        if (level <= 1) return;
        setLevel((prev) => prev - 1);
        return;
      case 'ArrowDown':
        if (level >= 5) return;
        setLevel((prev) => prev + 1);
        return;
      case 'Enter':
        onClickStart();
        return;
      default:
        break;
    }
  };
  const handleEnter = () => {
    if (!inputRef.current) return;
    addCheckedWords();
    focusInput();
  };

  const focusInput = () => {
    inputRef.current.disabled = true;
    setTimeout(() => {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }, 0);
    setInputValue('');
  };

  const addCheckedWords = () => {
    fallingWords.forEach((word) => {
      if (word === inputValue) {
        WaterDrop.pause();
        WaterDrop.currentTime = 0;
        WaterDrop.play();
        setCheckedWords((prev) => {
          if (!prev.includes(word)) {
            return [...prev, word];
          }
          return prev;
        });
      }
    });
  };
  const closeResultModal = () => {
    //게임 초기화 & 통계 저장?
    const data = JSON.parse(localStorage.getItem('AcidRainStatistics')) ?? [];
    localStorage.setItem(
      'AcidRainStatistics',
      JSON.stringify([
        ...data,
        {
          date: getFormattedDate(),
          userName: userName,
          score: checkedWords.length,
          level: level,
        },
      ])
    );
    setIsResultModalOpen(false);
  };
  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  const onClickStart = () => {
    setIsStarted(true);
  };
  const onClickLevelButton = (lev) => () => {
    setLevel(lev);
  };
  const closeStatisticsModal = () => {
    setIsStatisticsModalOpen(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [level]);
  useEffect(() => {
    if (isStarted) RainSound.play();
    else {
      RainSound.pause();
      RainSound.currentTime = 0;
    }
    inputRef.current?.focus();
  }, [isStarted]);
  console.log(
    chunkedShuffledWordIndexes.map((arr) => arr.map((idx) => WORDS[idx]))
  );
  if (!isStarted)
    return (
      <div className='modal_overlay' onClick={handleClickOutside}>
        <div className='acid_rain_modal' onClick={handleClickModal}>
          <div className='acid_rain_init_contents'>
            <p className='acid_rain_title' onClick={handleStatisticsModalOpen}>
              소 나 기
            </p>
            <table className='acid_rain_info_table'>
              {/* <caption className='acid_rain_info_title'>난이도</caption> */}
              <thead>
                <tr>
                  <th>단계</th>
                  <th>한 번에 떨어지는 단어 수</th>
                  <th>낙하 시간</th>
                </tr>
              </thead>
              <tbody>
                {levelList.map((el, index) => (
                  <tr key={index} onKeyDown={handleButtonKeyDown}>
                    <td>
                      <button
                        className='level_button'
                        ref={index === level - 1 ? buttonRef : null}
                        onClick={onClickLevelButton(index + 1)}
                      >
                        {el.level}
                      </button>
                    </td>
                    <td>{el.count}</td>
                    <td>{el.timeLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className='acid_rain_start_button' onClick={onClickStart}>
              Start!
            </button>
          </div>
        </div>
        {isResultModalOpen && (
          <AcidRainResultModal
            closeModal={closeResultModal}
            score={checkedWords.length}
          />
        )}
        {isStatisticsModalOpen && (
          <AcidRainStatisticsModal closeModal={closeStatisticsModal} />
        )}
      </div>
    );
  return (
    <div className='modal_overlay' onClick={handleClickOutside}>
      <div className='acid_rain_modal' onClick={handleClickModal}>
        <img
          className='acid_rain_exit_button'
          onClick={onClickExitButton}
          alt='exit_button'
          src={ExitButton}
        />
        <div className='acid_rain_contents'>
          <div className='acid_rain_level'>{level}단계</div>
          {chunkedShuffledWordIndexes.map((row, rowIndex) => (
            <WordRow
              row={row}
              addFallingWords={addFallingWords}
              checkedWords={checkedWords}
              interval={interval}
              popFallingWords={popFallingWords}
              rowIndex={rowIndex}
              timeLimit={timeLimit}
              key={rowIndex}
            />
          ))}
          <div className='limit'>
            <input
              className='acid_rain_input'
              value={inputValue}
              onChange={onChange}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
            />
            <div className='acid_rain_result'>
              Correct Words : {checkedWords.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
