import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCard, updateCard } from '../../apis/cardAPI';
import DOMAIN from '../../config';
import './EditCard.css';

const EditCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login?.currentUser);
    const card = useSelector(state => state.cards.cardToTake?.card)

    const [description, setDescription] = useState('');

    const handleEditCard = (id) => {
        const cardUpdate = { image: card?.image, description: description }
        updateCard(user?.accessToken, dispatch, id, cardUpdate)
        alert('Update successfully')
        navigate('/list-card');
    }

    if (card) {
        var imgCard = card.image.replace('\\', '\/');
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        if (user?.accessToken) {
            getCard(user?.accessToken, dispatch, id)
        }
    })

    return (
        <>
            {
                card && (
                    <div className="edit-card-container">
                        <div className='edit-card-header'>Edit card</div>
                        <form onSubmit={() => handleEditCard(card?._id)} className='form-edit'>
                            <div className="card-img">
                                <img className="card-img-info" src={`${DOMAIN}/${imgCard}`} alt="card image" />
                            </div>

                            <FormControl variant="standard" sx={{ m: 1 }}>
                                <InputLabel htmlFor="description">Descirption</InputLabel>
                                <Input
                                    id="description"
                                    aria-describedby="description"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    type='text'

                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <FormHelperText id="description">Change description</FormHelperText>
                            </FormControl>

                            <Button sx={{ width: '100px', margin: '0 auto' }} type='submit' variant='contained' color='warning'>Edit</Button>
                        </form>
                    </div>
                )
            }

            {
                !card && (
                    <div>Not found card</div>
                )
            }
        </>
    )
}

export default EditCard;
