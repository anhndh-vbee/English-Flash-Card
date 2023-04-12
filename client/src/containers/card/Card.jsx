import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { deleteCard, getCard } from "../../apis/cardAPI";
import DOMAIN from "../../config";
import './Card.css'

const Card = ({ idCard }) => {
    const user = useSelector(state => state.auth.login?.currentUser);
    const allCards = useSelector(state => state.cards.allCards?.listCards);
    const cardToShow = allCards?.find(card => card?._id === idCard)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteCard = (id) => {
        deleteCard(user?.accessToken, dispatch, id)
        alert(`You have just deleted card with description: ${cardToShow?.description}`)
    }

    const handleEditCard = (id) => {
        navigate(`/update-card/${id}`)
    }

    if (cardToShow) {
        var linkImageCard = cardToShow && cardToShow?.image.replace('\\', '\/');
    }

    return (
        <>
            {
                cardToShow && user?.isAdmin && (
                    <div className="card-container">
                        <div className="card-img">
                            <img className="card-img-info" src={`${DOMAIN}/${linkImageCard}`} alt="card image" />
                        </div>
                        < div className="card-des" >
                            {cardToShow.description}
                        </div>
                        <div className="action-card">
                            <Stack direction='row'>
                                <Button variant="contained" color="warning" onClick={() => handleDeleteCard(cardToShow?._id)}>Delete</Button>
                                <Button variant="contained" color="info" onClick={() => handleEditCard(cardToShow?._id)}>Edit</Button>
                            </Stack>
                        </div>
                    </div>
                )
            }

            {
                !cardToShow && <div>Not found</div>
            }
        </>
    )
}

export default Card;
