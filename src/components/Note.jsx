


export default function Note({noteFilter, setNoteFilter}) {
    return (
        <div className="note">
            <label htmlFor="note" className="mx-2">Filter by the rating : </label>
            <input
                id="note"
            type="number"
            placeholder="Minimum Rating..."
            value={noteFilter}
            onChange={(e) => setNoteFilter(e.target.value)}
            />
        </div>
    )
}