import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { deleteCard } from "../../apis/cardAPI";
import DOMAIN from "../../config";
import './Card.css'
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ idCard, isCardInLesson, onFlip, handleLearned }) => {
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

    const [isFlipped, setFlipped] = useState(false);
    const handleFlip = (e) => {
        e.preventDefault();
        setFlipped((isFlipped) => !isFlipped);
    }

    const styles = {
        card: {
            border: '1px solid #eeeeee',
            borderRadius: '3px',
            padding: '15px',
            width: '250px'
        },
        image: {
            height: '200px',
            width: '250px'
        }
    };

    // const _card = document.querySelector('.card');
    // const handleFlip = () => {
    //     _card.classList.toggle('is-flipped')
    // }


    // const handleCompleteCard = (id) => {
    //     if (e.target.checked) {
    //         document.querySelector(`flip-card-checked-${id}`).style.display = 'none'
    //     }
    // }

    // const [check, setCheck] = useState(false);
    // const [cardComplete, setCardComplete] = useState();
    // const handleCompleteCard = (e) => {
    //     setCheck(e.checked);
    // }

    // const handleFlipCard = () => {
    //     document.getElementById('flip-card').classList.toggle('flip-card-user-add')
    // }

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
                cardToShow && !user?.isAdmin && isCardInLesson && (
                    <div className="card-of-user">
                        <ReactCardFlip isFlipped={isFlipped}>
                            <div className="user-card-image">
                                <img className="img-user-card" src={`${DOMAIN}/${linkImageCard}`} alt="Avatar" />
                                <center><button className="btn-flip" onClick={handleFlip}>Show result</button></center>
                            </div>

                            <div style={styles.card} className="user-card-content">
                                <div className="result">{cardToShow?.description}</div>
                                <center><button className="btn-flip" onClick={handleFlip}>Show image</button></center>
                            </div>
                        </ReactCardFlip>
                    </div>
                )
            }

            {
                cardToShow && !user?.isAdmin && !isCardInLesson && (
                    <>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img src={`${DOMAIN}/${linkImageCard}`} alt="Avatar" style={{ width: '200px', height: '200px' }} />
                                </div>
                                <div class="flip-card-back">
                                    {cardToShow?.description}
                                </div>
                            </div>
                        </div>

                    </>
                )
            }

            {
                !cardToShow && <div>Not found</div>
            }
        </>
    )
}

export default Card;
