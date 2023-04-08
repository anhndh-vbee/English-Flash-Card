import { useEffect, useState } from "react"
import { getCard } from "../../apis/cardAPI";

const Card = ({ idCard }) => {
    const [card, setCard] = useState();

    const loadCard = async (id) => {
        const result = await getCard(idCard);
        setCard(result)
    }

    useEffect(() => {
        loadCard();
    }, [])
    return (
        <div className="card-container">
            <div className="card-name">{card?.description}</div>
            <div className="card-image">
                <img src={card?.image} alt="image-card" />
            </div>
        </div>
    )
}

export default Card;
