import type { Flashcard } from "../../types/Flashcard";
import FlashcardCard from "../FlashcardCard/FlashcardCard";
import "./FlashcardList.scss"

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
                <FlashcardCard key={c.id} card={c} onToggleLearned={onToggleLearned} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default FlashcardList;