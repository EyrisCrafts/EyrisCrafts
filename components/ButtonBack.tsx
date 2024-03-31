'use client';
import { IoReturnDownBack } from "react-icons/io5";

export default function ButtonBack () {

    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className="cursor-pointer h-16 w-16" onClick={handleBack}>
            <IoReturnDownBack size={30}/>
        </div>
    );
}