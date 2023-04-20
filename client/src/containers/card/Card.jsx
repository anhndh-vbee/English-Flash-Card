import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import DOMAIN from '../../config';
import { deleteCard } from '../../apis/cardAPI';
import CustomModal from '../../components/modal/CustomModal';
import './Card.css';

const Card = ({ idCard, isCardInLesson }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const allCards = useSelector((state) => state.cards.allCards?.listCards);
  const cardToShow = allCards?.find((card) => card?._id === idCard);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteCard = (id) => {
    deleteCard(user?.accessToken, dispatch, id);
    alert(
      `You have just deleted card with description: ${cardToShow?.description}. Wait a minute to see change`,
    );
    handleClose();
    navigate('/list-cards');
  };

  const handleEditCard = (id) => {
    navigate(`/update-card/${id}`);
  };

  if (cardToShow) {
    var linkImageCard = cardToShow && cardToShow?.image.replace('\\', '/');
  }

  const [isFlipped, setFlipped] = useState(false);
  const handleFlip = (e) => {
    e.preventDefault();
    setFlipped((isFlipped) => !isFlipped);
  };

  const styles = {
    card: {
      border: '1px solid #eeeeee',
      borderRadius: '3px',
      padding: '15px',
      width: '250px',
    },
    image: {
      height: '200px',
      width: '250px',
    },
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal
        open={open}
        handleClose={handleClose}
        card={cardToShow}
        handleDeleteCard={handleDeleteCard}
      />
      {cardToShow && user?.isAdmin && (
        <div className="card-container">
          <div className="card-img">
            <img
              className="card-img-info"
              src={`${DOMAIN}/${linkImageCard}`}
              alt="card image"
            />
          </div>
          <div className="card-des">{cardToShow.description}</div>
          <div className="action-card">
            <Stack direction="row">
              <Button variant="contained" color="warning" onClick={handleOpen}>
                Delete
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleEditCard(cardToShow?._id)}
              >
                Edit
              </Button>
            </Stack>
          </div>
        </div>
      )}

      {cardToShow && !user?.isAdmin && isCardInLesson && (
        <div className="card-of-user">
          <ReactCardFlip isFlipped={isFlipped}>
            <div onClick={handleFlip} className="user-card-image">
              <img
                className="img-user-card"
                src={`${DOMAIN}/${linkImageCard}`}
                alt="Avatar"
              />
            </div>

            <div
              onClick={handleFlip}
              style={styles.card}
              className="user-card-content"
            >
              <div className="result">{cardToShow?.description}</div>
            </div>
          </ReactCardFlip>
        </div>
      )}

      {cardToShow && !user?.isAdmin && !isCardInLesson && (
        <div style={{ border: '1px solid gray', textAlign: 'center' }}>
          <div>
            <div>
              <img
                src={`${DOMAIN}/${linkImageCard}`}
                alt="Avatar"
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <div>{cardToShow?.description}</div>
          </div>
        </div>
      )}

      {!cardToShow && <div>Not found</div>}
    </>
  );
};

export default Card;
