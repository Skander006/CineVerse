


export default function CategoryTV({categoryFilter, setCategoryFilter}){
    return (
        <div className="category">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Action & Adventure">Action & Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Family">Family</option>
                <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                <option value="Mystery">Mystery</option>
            </select>
        </div>
    )
}