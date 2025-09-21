import { useState } from "react";
import type { Flashcard } from "../../types/Flashcard";
import "./FlashcardCard.scss"

type FlashcardCardProps = {
    card: Flashcard;
    onToggleLearned: (id: string) => void;
    onEdit: (card: Flashcard) => void;
    onDelete: (id: string) => void;
    mode?: "dashboard" | "study";
};


function FlashcardCard({ 
    card, 
    onToggleLearned, 
    onEdit, 
    onDelete,
    mode = "dashboard"
}: FlashcardCardProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div 
            className={`flashcard ${flipped ? "flipped" : ""} ${mode === "study" ? "study-mode" : ""}`}
        >
            <div className="card-inner" onClick={() => setFlipped((s) => !s)}>
                <div className="card-front">
                    <div className="card-header">
                        <span className="topic-tag" style={{ background: card.color }}>{card.topic}</span>
                        <span className="learned-status">{card.learned ? 'Learned' : 'Not learned'}</span>
                    </div>
                    <div className="card-body">
                        <p className="question">{card.question}</p>
                    </div>
                </div>
                <div className="card-back">
                    <div className="card-header">
                        <span className="topic-tag" style={{ background: card.color }}>{card.topic}</span>
                        <span className="learned-status">{card.learned ? 'Learned' : 'Not learned'}</span>
                    </div>
                    <div className="card-body">
                        <p className="answer">{card.answer}</p>
                    </div>
                </div>
            </div>


            <div className="card-footer">
                <button onClick={() => onToggleLearned(card.id)}>
                    {card.learned ? "Mark Need Revision" : "Mark Learned"}
                </button>

                {mode === "dashboard" && (
                    <>
                        <button onClick={() => onEdit?.(card)}>Edit</button>
                        <button className="btn-danger" onClick={() => onDelete?.(card.id)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}
export default FlashcardCard;
