interface Props {
    title: string;
    company: string;
    location: string;
    date: string;
    description: string;
    techStack: string[];
}


export default function ItemExperience({title, company, location, date, description, techStack}: Props){ 
    return (
        <div className="flex flex-col gap-3 mb-10">
            {/* Title and date on row */}
            <div className="flex flex-row justify-between">
                <div className="text-title-grey font-bold text-lg">{title}</div>
                <div className="text-date-grey">{date}</div>
            </div>
            {/* Company and location on row */}
            <div className="flex flex-row justify-between">
                <div className="text-title-grey">{company}</div>
                <div className="text-date-grey">{location}</div>
            </div>
            {/* Description */}
            <div className="text-title-grey" dangerouslySetInnerHTML={{__html: description}}></div>
            {/* Tech stack */}
            <div className="flex flex-row gap-2">
                {techStack.map((tech) => (
                    <div key={tech} className="px-3 py-2 bg-white text-smol-bg text-xs font-semibold rounded dark:bg-slate-700">
                        {tech}
                    </div>
                ))}
            </div>
            

        </div>
    );
}