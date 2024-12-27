import { Word } from 'components/AcidRain/Word';
import { WORDS } from 'constants/acidRainContents';
import { getShuffledIndexArray } from 'utils/helper';

export default function WordRow({
  row,
  checkedWords,
  timeLimit,
  interval,
  addFallingWords,
  popFallingWords,
  rowIndex,
}) {
  const shuffledIndexes = getShuffledIndexArray(row);
  return (
    <div className='acid_rain_top_row'>
      {row.map((shuffledWordIndex, index) => (
        <Word
          key={index}
          word={WORDS[shuffledWordIndex]}
          isChecked={checkedWords.includes(WORDS[shuffledWordIndex])}
          timeLimit={timeLimit}
          interval={interval * (rowIndex * row.length + shuffledIndexes[index])}
          addFallingWords={addFallingWords}
          popFallingWords={popFallingWords}
        />
      ))}
    </div>
  );
}
