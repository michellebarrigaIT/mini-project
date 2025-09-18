import type { Flashcard } from "../../types/Flashcard";

function FlashcardList({
    cards,
    onToggleLearned,
    onEdit,
    onDelete,
    view = 'grid',
}: {
    cards: Flashcard[];
    onToggleLearned: (id: string) => void;
    onEdit: (card: Flashcard) => void;
    onDelete: (id: string) => void;
    view?: 'grid' | 'list';
    }) {
    return (
    <div className={`flashcard-list ${view}`}>
        {cards.map((c) => (
            <div key={c.id} className={`flashcard ${c.learned ? 'learned' : ''}`} style={{ borderColor: c.color }}>
                <div className="flashcard-content">
                    <h3>{c.question}</h3>
                    <p>{c.answer}</p>
                    <span className="topic">{c.topic}</span>
                </div>
                <div className="flashcard-actions">
                    <button onClick={() => onToggleLearned(c.id)}>{c.learned ? 'Unmark Learned' : 'Mark as Learned'}</button>
                    <button onClick={() => onEdit(c)}>Edit</button>
                    <button onClick={() => onDelete(c.id)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
    );
}

export default FlashcardList;