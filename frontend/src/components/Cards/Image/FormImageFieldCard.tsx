import Image from "../../../classes/Image";

function FormImageFieldCard ({ field }: {field: Image}) {
    return (
        <div className="flex flex-col gap-3 px-8 py-4 rounded-md bg-white  dark:bg-dark-card-light dark:border dark:border-dark-border">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
        
            <p>{field?.caption}</p>
        </div>
    )
}

export default FormImageFieldCard;