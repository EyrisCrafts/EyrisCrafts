
interface Props {
    title: string;
}

export default function ItemTech({title}: Props) {
    return (
        <div className="px-3 py-2 bg-white text-smol-bg text-xs font-semibold rounded dark:bg-slate-700">
            {title}
        </div>
    );
}