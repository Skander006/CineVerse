


export default function LikeSerie({isLiked, onToggleLiked}){
    return (
        <div onClick={(e)=>e.stopPropagation()}>
            <i onClick={onToggleLiked} className={isLiked? "fa-solid fa-heart heart" : "fa-regular fa-heart heart"}></i>
        </div>
    )
}