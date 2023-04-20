import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import { addCard } from '../../apis/cardAPI';
import './AddCardForm.css';

const AddCardForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const _lessons = useSelector(
    (state) => state.lessons.allLessons?.listLessons,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [lesson, setLesson] = useState();

  const handleAddNewCard = (e) => {
    e.preventDefault();
    const newCard = new FormData();
    newCard.append('image', image);
    newCard.append('description', description);
    if (lesson) {
      newCard.append('lesson', lesson);
    }
    addCard(user?.accessToken, dispatch, newCard);
    navigate('/list-cards');
  };

  const handleShowAddLesson = () => {
    if (document.getElementById('inputLesson').style.display === 'none') {
      document.getElementById('inputLesson').style.display = '';
    } else {
      document.getElementById('inputLesson').style.display = 'none';
    }
  };

  return (
    <>
      <div className="form-add-card-container">
        <div className="form-add-card-header">Add new card</div>
        <form className="form-add-card-main" onSubmit={handleAddNewCard}>
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel htmlFor="image">Image</InputLabel>
            <Input
              id="image"
              aria-describedby="image"
              inputProps={{
                'aria-label': 'weight',
              }}
              type="file"
              required={true}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <FormHelperText id="image">Upload image</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              aria-describedby="description"
              inputProps={{
                'aria-label': 'weight',
              }}
              type="text"
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormHelperText id="descrition">Enter description</FormHelperText>
          </FormControl>

          <Button
            className="btn-add-lesson-choice"
            variant="contained"
            color="warning"
            onClick={handleShowAddLesson}
          >
            Do you want to add card to any lesson?
          </Button>

          <FormControl id="inputLesson" variant="standard" sx={{ m: 1 }}>
            <InputLabel htmlFor="lesson">Lesson</InputLabel>
            <Input
              id="lesson"
              aria-describedby="lesson"
              inputProps={{
                'aria-label': 'weight',
              }}
              type="text"
              onChange={(e) => setLesson(e.target.value)}
            />
            <FormHelperText id="lesson">Enter lesson id</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            className="btn-add-card"
            variant="contained"
            color="success"
          >
            Add
          </Button>
        </form>
      </div>

      <div className="list-lesson-choice-contain">
        <div className="list-lesson-choice-header">List lesson</div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {_lessons &&
            _lessons.map((_lesson, index) => (
              <tr key={index}>
                <td>{_lesson._id}</td>
                <td>{_lesson.description}</td>
              </tr>
            ))}
        </table>
        {!_lessons && <div className="no-lesson">No lesson be created</div>}
      </div>
    </>
  );
};

export default AddCardForm;
