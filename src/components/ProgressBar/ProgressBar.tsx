import './ProgressBar.scss';

function ProgressBar({ value }: { value: number }) {
    return (
        <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${value}%` }} />
            <div className="progress-text">{Math.round(value)}% learned</div>
        </div>
    );
}

export default ProgressBar;