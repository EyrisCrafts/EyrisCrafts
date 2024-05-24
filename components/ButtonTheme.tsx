'use client';

import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { useTheme } from 'next-themes'

export default function ButtonTheme() {
    const {theme, setTheme} = useTheme();
    
    const handleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            console.log("updating theme to dark");
        } else {
            console.log("updating theme to light");
            setTheme('light');
        }
    }

    return (
        <div onClick={handleTheme} className="cursor-pointer">
            <WiMoonAltWaningCrescent1 size={30}/>
        </div>
    );
}