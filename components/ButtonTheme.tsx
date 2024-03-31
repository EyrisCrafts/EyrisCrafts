'use client';

import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { useTheme } from 'next-themes'

export default function ButtonTheme() {
    const {theme, setTheme} = useTheme();
    
    const handleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            console.log("updating theme to light");
        } else {
            console.log("updating theme to dark");
            setTheme('dark');
        }
    }

    return (
        <div onClick={handleTheme} className="cursor-pointer">
            <WiMoonAltWaningCrescent1 size={30}/>
        </div>
    );
}