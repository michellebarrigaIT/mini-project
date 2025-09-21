import "./ToggleButton.scss"
import { Link, useLocation } from "react-router-dom";

function ToggleButton() {
    const location = useLocation();
    const isStudyMode = location.pathname === "/study-mode";

    return (
        <div className="toggle-button">
            <Link
                to="/"
                className={`toggle-link ${!isStudyMode ? "active" : ""}`}
            >
                Dashboard
            </Link>
            <Link
                to="/study-mode"
                className={`toggle-link ${isStudyMode ? "active" : ""}`}
            >
                Study Mode
            </Link>
        </div>
    )
}

export default ToggleButton