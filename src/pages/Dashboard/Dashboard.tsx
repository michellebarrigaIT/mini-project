import { useState } from "react";
import FlashcardForm from "../../components/FlashcardForm/FlashcardForm";
import FlashcardList from "../../components/FlashcardList/FlashcardList";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { Flashcard } from "../../types/Flashcard";
import "./Dashboard.scss";
import Search from "../../components/Search/Search";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function Dashboard() {
    const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>("flashcards", []);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Flashcard | null>(null);
    const [toSearch, setToSearch] = useState("");
    const [topicFilter, setTopicFilter] = useState<string | 'all'>('all');

    const topics = Array.from(new Set(flashcards.map(flashcard => flashcard.topic || "General")));

    const addOrUpdateCard = (card: Omit<Flashcard, "id"> & { id?: string }) => {
        if (card.id) {
            setFlashcards((prev) =>
                prev.map((flashcard) => (flashcard.id === card.id ? { ...flashcard, ...card } : flashcard))
            );
        } else {
            const newCard: Flashcard = { ...card, id: crypto.randomUUID() };
            setFlashcards((prev) => [newCard, ...prev]);
        }
        setShowForm(false);
        setEditing(null);
    };

    const toggleLearned = (id: string) => {
        setFlashcards((prev) =>
            prev.map((flashcard) => (flashcard.id === id ? { ...flashcard, learned: !flashcard.learned } : flashcard))
        );
    };

    const deleteCard = (id: string) => {
        if (confirm("Are you sure you want to delete this card?")) {
            setFlashcards((prev) => prev.filter((flashcard) =>flashcard.id !== id));
        }
    };

    const handleEdit = (card: Flashcard) => {
        setEditing(card);
        setShowForm(true);
    };

    const filteredCards = flashcards.filter(flashcard => {
        const matchesQ =
            !toSearch.trim() ||
            flashcard.question.toLowerCase().includes(toSearch.toLowerCase()) ||
            flashcard.answer.toLowerCase().includes(toSearch.toLowerCase());
        const matchesTopic = topicFilter === 'all' || flashcard.topic === topicFilter;
        return matchesQ && matchesTopic;
    });

    const learnedRatio = flashcards.length
        ? (flashcards.filter(flashcard => flashcard.learned).length / flashcards.length) * 100
        : 0;

    return (
        <div className="dashboard">
            <h1>Flashcards Dashboard</h1>
            <div className="dashboard-controls">
                <button onClick={() => { setShowForm(true); setEditing(null); }}>
                    + Add Flashcard
                </button>

                <Search
                    toSearch={toSearch}
                    setToSearch={setToSearch}
                    topic={topicFilter}
                    setTopic={setTopicFilter}
                    topics={topics}
                />
            </div>

            <ProgressBar value={learnedRatio} />

            {showForm && (
                <FlashcardForm
                    initial={editing ?? undefined}
                    onSave={addOrUpdateCard}
                    onCancel={() => { setShowForm(false); setEditing(null); }}
                />
            )}

            <FlashcardList
                cards={filteredCards}
                onToggleLearned={toggleLearned}
                onEdit={handleEdit}
                onDelete={deleteCard}
            />
        </div>
    );
}

export default Dashboard;
