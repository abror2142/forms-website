import { FormField } from "../types/FormField";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import QuestionField from "./QuestionField";
import TextField from "./TextField/TextField";
import ImageField from "./ImageField/ImageField";

type Props = {
    formField: FormField;
    forceDragging?: boolean;
}

function SortableFormField ({formField, forceDragging}: Props) {
    const {isDragging, setNodeRef, transform, transition} = useSortable({id: formField.sequence});
    
    const parentStyles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
        opacity: isDragging ? "0.4" : "1",
    }

    const draggableStyle = {
        cursor: isDragging || forceDragging ? "grabbing" : "grab"
    }

    return (
        <div ref={setNodeRef} style={parentStyles}>
            <div>
                {   formField.type === 'question' 
                    ? <QuestionField formField={formField} key={"question-field-" + formField.id} />
                    : formField.type === 'image'
                    ? <ImageField formField={formField} key={"image-field-" + formField.id} />
                    : formField.type === 'text'
                    ? <TextField formField={formField} key={"text-field-" + formField.id} />
                    : null
                }
            </div>
        </div>
    )
}

export default SortableFormField;