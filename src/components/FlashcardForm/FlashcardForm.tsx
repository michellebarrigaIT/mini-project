import { useForm } from "react-hook-form";
import type { Flashcard } from "../../types/Flashcard";
import "./FlashcardForm.scss";

type FlashcardFormProps = {
    initial?: Partial<Flashcard>;
    onSave: (card: Omit<Flashcard, "id"> & { id?: string }) => void;
    onCancel?: () => void;
};

type FlashcardFormData = {
    question: string;
    answer: string;
    topic: string;
    color: string;
};

function FlashcardForm({ initial = {}, onSave, onCancel }: FlashcardFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FlashcardFormData>({
        defaultValues: {
            question: initial.question ?? "",
            answer: initial.answer ?? "",
            topic: initial.topic ?? "General",
            color: initial.color ?? "#caa336ff",
        }
    });

    const onSubmit = (data: FlashcardFormData) => {
        onSave({
            id: (initial as Flashcard).id,
            ...data,
            learned: initial.learned ?? false,
        });

        reset({
            question: "",
            answer: "",
            topic: "General",
            color: "#caa336ff",
        });
    };

    return (
        <form className="flashcard-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Question *
                <textarea 
                    {...register("question", { required: "Question is required", minLength: { value: 3, message: "Min length is 3 characters" }})} 
                />
                {errors.question && <span className="error">{errors.question.message}</span>}
            </label>

            <label>
                Answer *
                <textarea 
                    {...register("answer", { required: "Answer is required", minLength: { value: 10, message: "Min length is 10 characters" }, maxLength: { value: 500, message: "Max length is 250 characters" } })} 
                />
                    {errors.answer && <span className="error">{errors.answer.message}</span>}
            </label>

            <label>
                Topic
                <input 
                    {...register("topic", { required: "Topic is required",  minLength: { value: 2, message: "Min length is 2 characters" } })} 
                />
                {errors.topic && <span className="error">{errors.topic.message}</span>}
            </label>

            <label>
                Color tag
                <input 
                    className="color" 
                    type="color" 
                    {...register("color")} 
                />
            </label>

            <div className="form-actions">
                <button type="submit">Save</button>
                {onCancel && (
                <button 
                    type="button" 
                    onClick={onCancel}
                >
                    Cancel
                </button>
                )}
            </div>
        </form>
    );
}

export default FlashcardForm;
