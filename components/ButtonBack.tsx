'use client';
import { IoReturnDownBack } from "react-icons/io5";

export default function ButtonBack () {

    const handleBack = () => {
        // Go to url eyriscrafts.com
        window.location.href = '/';
        
    }

    return (
        <div className="cursor-pointer h-16 w-16" onClick={handleBack}>
            <IoReturnDownBack size={30}/>
        </div>
    );
}