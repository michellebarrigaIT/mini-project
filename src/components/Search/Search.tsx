import './Search.scss';

function Search({
    toSearch,
    setToSearch,
    topic,
    setTopic,
    topics,
}: {
    toSearch: string;
    setToSearch: (s: string) => void;
    topic: string | 'all';
    setTopic: (t: string | 'all') => void;
    topics: string[];
}) {
    return (
        <div className="search">
            <input placeholder="Search question or answer..." value={toSearch} onChange={(e) => setToSearch(e.target.value)} />
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="all">All topics</option>
                {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
        </div>
    );
}

export default Search;