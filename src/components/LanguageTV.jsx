




export default function LanguageTV({ languageFilter, setLanguageFilter }) {
    return (
        <div className="language">
            <select value={languageFilter} onChange={(e)=>setLanguageFilter(e.target.value)}>
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="it">Italian</option>
                <option value="es">Spanish</option>
                <option value="ja">Japanese</option>
            </select>
        </div>
    )
}