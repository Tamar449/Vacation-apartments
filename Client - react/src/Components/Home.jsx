import { useEffect, useState } from "react";
import { Nav, SmallNav } from "./Nav";
import { Apartments } from "./Apartments";

export const Home = () => {


    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div className="home">
        <Nav></Nav>
        <div >
            <Apartments></Apartments>
        </div>
    </div>

}