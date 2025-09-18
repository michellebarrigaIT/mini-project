import { useState } from "react";
import type { Flashcard } from "../../types/Flashcard";

type FlashcardFormProps = {
    initial?: Partial<Flashcard>;
    onSave: (card: Omit<Flashcard, 'id'> & { id?: string }) => void;
    onCancel?: () => void;
};


function FlashcardForm({ initial = {}, onSave, onCancel }: FlashcardFormProps) {
    const [question, setQuestion] = useState(initial.question ?? "");
    const [answer, setAnswer] = useState(initial.answer ?? "");
    const [topic, setTopic] = useState(initial.topic ?? "General");
    const [color, setColor] = useState(initial.color ?? "#7aa2ff");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || !answer.trim()) {
            alert("Question and answer are required");
            return;
        }


        onSave({
            id: (initial as any).id,
            question: question.trim(),
            answer: answer.trim(),
            topic: topic.trim(),
            color,
            learned: initial.learned ?? false,
        });


        setQuestion("");
        setAnswer("");
    };


    return (
        <form className="flashcard-form" onSubmit={handleSubmit}>
            <label>
                Question *
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
            </label>

            <label>
                Answer *
                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </label>

            <label>
                Topic
                <input value={topic} onChange={(e) => setTopic(e.target.value)} />
            </label>

            <label>
                Color tag
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>

            <div className="form-actions">
                <button type="submit">Save</button>
                {onCancel && (
                <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
                </button>
                )}
            </div>
        </form>
    );
}

export default FlashcardForm;