import React from 'react';
import styles from './GuideCharacter.module.css';

interface GuideCharacterProps {
  message: string;
  characterImage?: string; // Path to the character image
}

const GuideCharacter: React.FC<GuideCharacterProps> = ({
  message,
  characterImage = '/images/guide/fox.svg', // Default placeholder
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.speechBubble}>
        <p className={styles.message}>{message}</p>
        <div className={styles.arrow}></div>
      </div>
      <img
        src={characterImage}
        alt="Przewodnik"
        className={styles.characterImage}
      />
      {/* TODO: Implement character sound effects */}
    </div>
  );
};

export default GuideCharacter;

