import { useState } from "react";
import ToggleButton from "../../components/ToggleButton/ToggleButton"
import useLocalStorage from "../../hooks/useLocalStorage";
import type { Flashcard } from "../../types/Flashcard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import FlashcardCard from "../../components/FlashcardCard/FlashcardCard";
import "./Study.scss"
import Timer from "../../components/Timer/Timer";

function Study() {
  const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>("flashcards", []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleToggleLearned = (id: string) => {
    setFlashcards(prev =>
      prev.map(flashcard => (flashcard.id === id ? { ...flashcard, learned: !flashcard.learned } : flashcard))
    );
  };

  const handleShuffle = () => {
    setFlashcards(prev => {
      const shuffledDeck = [...prev].sort(() => Math.random() - 0.5);
      return shuffledDeck;
    });
    setCurrentIndex(0);
    setShuffled(true);
  };

  const progress = flashcards.length
    ? ((currentIndex + 1) / flashcards.length) * 100
    : 0;

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };
  
  return (
    <div className="container">
      <Timer />
      <ToggleButton/>
      <h1>Study Mode</h1>
      <ProgressBar value={progress} />

      {!shuffled && flashcards.length > 1 && (
        <button className="shuffle-btn" onClick={handleShuffle}>
          Shuffle Deck
        </button>
      )}

      {currentCard ? (
        <div className="study-card">
          <FlashcardCard
            card={currentCard}
            onToggleLearned={handleToggleLearned}
            onEdit={() => {}}
            onDelete={() => {}}
            mode="study"
          />
          <div className="study-nav">
            <button onClick={prevCard} disabled={currentIndex === 0}>
              {'<<'}
            </button>
            <span>
              {currentIndex + 1} / {flashcards.length}
            </span>
            <button
              onClick={nextCard}
              disabled={currentIndex === flashcards.length - 1}
            >
              {'>>'}
            </button>
          </div>
        </div>
      ) : (
        <p>No flashcards available. Go to Dashboard to add some!</p>
      )}
    </div>
  )
}

export default Study