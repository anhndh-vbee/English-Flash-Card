import { useEffect, useState } from "react"
import Card from "../../containers/card/Card"
import { getAllCards } from "../../apis/cardAPI";

const AllCards = () => {
    const [allCards, setAllCards] = useState([]);

    const loadAllCards = async () => {
        const result = await getAllCards();
        setAllCards(result);
    }

    useEffect(() => {
        loadAllCards();
    }, [])

    return (
        <div className="list-cards">
            {allCards && allCards.map((card, index) => {
                return (
                    <div key={index} className="card-item">
                        <Card idCard={card?._id} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllCards;
