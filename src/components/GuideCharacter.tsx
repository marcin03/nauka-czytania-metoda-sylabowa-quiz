import React from 'react';

interface GuideCharacterProps {
  message: string;
  characterImage?: string; // Path to the character image
  bgColor?: string; // Background color for the speech bubble
  textColor?: string; // Text color for the speech bubble
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({
  message,
  characterImage = '/images/guide/fox.svg', // Default placeholder
  bgColor = '#ffffff',
  textColor = '#333333',
}) => {
  return (
    <div className="guide-character flex flex-col items-center p-4">
      <div
        className="speech-bubble relative p-4 rounded-lg shadow-lg mb-4"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <p className="text-lg font-medium">{message}</p>
        <div
          className="speech-bubble-arrow absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `10px solid ${bgColor}`,
          }}
        ></div>
      </div>
      <img
        src={characterImage}
        alt="Przewodnik"
        className="w-32 h-32 object-contain"
      />
      {/* TODO: Implement character sound effects */}
    </div>
  );
};

export default GuideCharacter;
