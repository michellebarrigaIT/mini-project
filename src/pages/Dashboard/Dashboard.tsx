import { useState } from "react";
import FlashcardForm from "../../components/FlashcardForm/FlashcardForm";
import FlashcardList from "../../components/FlashcardList/FlashcardList";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { Flashcard } from "../../types/Flashcard";

function Dashboard() {
  const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>("flashcards_v1", []);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Flashcard | null>(null);

  const addOrUpdateCard = (card: Omit<Flashcard, "id"> & { id?: string }) => {
    if (card.id) {
      // Update existing
      setFlashcards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, ...card } : c))
      );
    } else {
      // Add new
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

  return (
    <div className="dashboard">
      <h1>Flashcards Dashboard</h1>
      <button onClick={() => { setShowForm(true); setEditing(null); }}>
        + Add Flashcard
      </button>

      {showForm && (
        <FlashcardForm
          initial={editing ?? undefined}
          onSave={addOrUpdateCard}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <FlashcardList
        cards={flashcards}
        onToggleLearned={toggleLearned}
        onEdit={handleEdit}
        onDelete={deleteCard}
      />
    </div>
  );
}

export default Dashboard;
