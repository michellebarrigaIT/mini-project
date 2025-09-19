import { useEffect, useState } from "react"
import "./ToggleButton.scss"
import Dashboard from "../../pages/Dashboard/Dashboard";
import Study from "../../pages/Study/Study";
import { Link } from "react-router-dom";

function ToggleButton() {
    const [isStudyMode, setIsStudyMode] = useState<boolean>(false);

    return (
        <div className="toggle-button">
            <button
                onClick={() => { setIsStudyMode(false)}} 
            >
                <Link to="/" className={`right ${isStudyMode ? "active" : ""}`}>
                    Dashboard
                </Link>
            </button>
            <button
                className={`left ${isStudyMode ? "active" : ""}`}
                onClick={() => { setIsStudyMode(true)}}
            >
                <Link to="/study-mode" className={`right ${isStudyMode ? "active" : ""}`}>
                    Study Mode
                </Link>
            </button>
        </div>
    )
}

export default ToggleButton