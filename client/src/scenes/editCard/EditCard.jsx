import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCard } from '../../apis/cardAPI';
import './EditCard.css';

const EditCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.login?.currentUser);
    const allCards = useSelector(state => state.cards.allCards?.listCards);
    const cardToUpdate = allCards?.find(card => card?._id === id)

    const [description, setDescription] = useState(cardToUpdate?.description);
    const [image, setImage] = useState(cardToUpdate?.image);


    const handleEditCard = (id) => {
        const cardUpdated = new FormData();
        cardUpdated.append('description', description);
        cardUpdated.append('image', image)
        updateCard(user?.accessToken, dispatch, id, cardUpdated)
        alert('Update successfully')
        navigate('/');
    }

    return (
        <>
            {
                cardToUpdate && (
                    <div className="edit-card-container">
                        <div className='edit-card-header'>Edit card</div>
                        <form onSubmit={() => handleEditCard(cardToUpdate?._id)} className='form-edit'>
                            <FormControl variant="standard" sx={{ m: 1 }}>
                                <InputLabel htmlFor="description">Descirption</InputLabel>
                                <Input
                                    id="description"
                                    aria-describedby="description"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    type='text'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <FormHelperText id="description">Change description</FormHelperText>
                            </FormControl>

                            <FormControl variant="standard" sx={{ m: 1 }}>
                                <InputLabel htmlFor="image">Image</InputLabel>
                                <Input
                                    id="image"
                                    aria-describedby="image"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    type='file'
                                    required='true'
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <FormHelperText id="image">Upload image</FormHelperText>
                            </FormControl>

                            <Button sx={{ width: '100px', margin: '0 auto' }} type='submit' variant='contained' color='warning'>Edit</Button>
                        </form>
                    </div>
                )
            }

            {
                !cardToUpdate && (
                    <div>Not found card</div>
                )
            }
        </>
    )
}

export default EditCard;
