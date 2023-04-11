import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { getAllCards } from "../../apis/cardAPI";
import Card from "../../containers/card/Card";
import './AllCards.css'

const AllCards = () => {
    const user = useSelector(state => state.auth.login?.currentUser)
    const allCards = useSelector(state => state.cards.allCards?.listCards);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        if (user?.accessToken) {
            getAllCards(user?.accessToken, dispatch)
        }
    }, [])

    return (
        <div className="allcards">
            {
                allCards && (
                    <div className="all-card-container">
                        <div className="list-card-header">
                            List cards
                        </div>
                        {user?.isAdmin && (
                            <NavLink style={{ textDecoration: 'none' }} to={'/add-card'}><Stack><Button>Add Card</Button></Stack></NavLink>
                        )}
                        <hr />
                        <div className="list-card-container">
                            {allCards?.map((card, index) => {
                                return (
                                    <>
                                        <Card idCard={card?._id} index={index} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            }

            {
                !allCards && <div>Not found</div>
            }
        </div>
    )
}

export default AllCards;
