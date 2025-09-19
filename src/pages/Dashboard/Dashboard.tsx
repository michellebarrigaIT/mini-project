import { useMemo, useState } from "react";
import FlashcardForm from "../../components/FlashcardForm/FlashcardForm";
import FlashcardList from "../../components/FlashcardList/FlashcardList";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { Flashcard } from "../../types/Flashcard";
import "./Dashboard.scss";
import Search from "../../components/Search/Search";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function Dashboard() {
    const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>("flashcards_v1", []);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Flashcard | null>(null);
    const [q, setQ] = useState("");
    const [topicFilter, setTopicFilter] = useState<string | 'all'>('all');

    const topics = useMemo(() => {
        const set = new Set(flashcards.map(c => c.topic || "General"));
        return Array.from(set);
    }, [flashcards]);

    const addOrUpdateCard = (card: Omit<Flashcard, "id"> & { id?: string }) => {
        if (card.id) {
        setFlashcards((prev) =>
            prev.map((c) => (c.id === card.id ? { ...c, ...card } : c))
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
        prev.map((c) => (c.id === id ? { ...c, learned: !c.learned } : c))
        );
    };

    const deleteCard = (id: string) => {
        if (confirm("Are you sure you want to delete this card?")) {
        setFlashcards((prev) => prev.filter((c) => c.id !== id));
        }
    };

    const handleEdit = (card: Flashcard) => {
        setEditing(card);
        setShowForm(true);
    };

    const filteredCards = flashcards.filter(c => {
        const matchesQ =
            !q.trim() ||
            c.question.toLowerCase().includes(q.toLowerCase()) ||
            c.answer.toLowerCase().includes(q.toLowerCase());
        const matchesTopic = topicFilter === 'all' || c.topic === topicFilter;
        return matchesQ && matchesTopic;
    });

    const learnedRatio = flashcards.length
        ? (flashcards.filter(c => c.learned).length / flashcards.length) * 100
        : 0;

    return (
        <div className="dashboard">
        <h1>Flashcards Dashboard</h1>
        <div className="dashboard-controls">
            <button onClick={() => { setShowForm(true); setEditing(null); }}>
            + Add Flashcard
            </button>

            <Search
                q={q}
                setQ={setQ}
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
