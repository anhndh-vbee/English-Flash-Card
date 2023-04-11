import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { deleteCard, getCard } from "../../apis/cardAPI";
import DOMAIN from "../../config";
import './Card.css'

const Card = (props) => {
    const id = props.idCard
    const index = props.index
    const card = useSelector(state => state.cards.allCards?.listCards[index]);

    // const card = useSelector(state => state.cards.cardToTake?.card)
    const user = useSelector(state => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (card) {
        var linkImageCard = card.image.replace('\\', '\/');
    }

    const handleDeleteCard = (id) => {
        deleteCard(user?.accessToken, dispatch, id)
        alert(`You have just deleted card with description: ${card?.description}`)
    }

    const handleEditCard = (id) => {
        navigate(`/update-card/${id}`)
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (user?.accessToken) {
            getCard(user?.accessToken, dispatch, id)
        }
    }, [])

    return (
        <>
            {
                card && user?.isAdmin && (
                    <div className="card-container">
                        <div className="card-img">
                            <img className="card-img-info" src={`${DOMAIN}/${linkImageCard}`} alt="card image" />
                        </div>
                        < div className="card-des" >
                            {card.description}
                        </div>
                        <div className="action-card">
                            <Stack direction='row'>
                                <Button variant="contained" color="warning" onClick={() => handleDeleteCard(card?._id)}>Delete</Button>
                                <Button variant="contained" color="info" onClick={() => handleEditCard(card?._id)}>Edit</Button>
                            </Stack>
                        </div>
                    </div>
                )
            }

            {
                !card && <div>Not found</div>
            }
        </>
    )
}

export default Card;
