import React from 'react';
import WordCloud from 'react-wordcloud';

const WordCloudComponent = ({ words }) => {
    const options = {
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        rotations: 2,
        rotationAngles: [0, 90],
        scale: 'linear',
        spiral: 'archimedean',
        padding: 2,
        fontSizes: [18, 64],
      };

  return (
    <div className="bg-light m-4">
      <WordCloud words={words} options={options} />
    </div>
  );
};

export default WordCloudComponent;
