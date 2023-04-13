import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { deleteCard } from "../../apis/cardAPI";
import DOMAIN from "../../config";
import './Card.css'

const Card = ({ idCard, isCardInLesson }) => {
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
                    <div className="a-flip-card-user">
                        <input type="checkbox" style={{ width: '20px', height: '20px' }} />Checked

                        <div className="flip-container" onClick={() => this.classList.toggle('hover')}>
                            <div className="flipper">
                                <div className="front">
                                    <img src={`${DOMAIN}/${linkImageCard}`} alt="Avatar" style={{ width: '200px', height: '200px' }} />
                                </div>
                                <div className="back">
                                    {cardToShow?.description}
                                </div>
                            </div>
                        </div>
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
