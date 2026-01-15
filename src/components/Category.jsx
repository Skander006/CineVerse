


export default function Category({categoryFilter, setCategoryFilter}){
    return (
        <div className="category">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Horror">Horror</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Drama</option>
                <option value="Family">Family</option>
                <option value="History">History</option>
                <option value="science fiction">Science Fiction</option>
                <option value="Thriller">Thriller</option>
            </select>
        </div>
    )
}