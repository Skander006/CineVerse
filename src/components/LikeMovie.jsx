


export default function LikeMovie({isLiked, onToggleLiked}){
    return (
        <div>
            <i onClick={onToggleLiked} className={isLiked? "fa-solid fa-heart heart" : "fa-regular fa-heart heart"}></i>
        </div>
    )
}