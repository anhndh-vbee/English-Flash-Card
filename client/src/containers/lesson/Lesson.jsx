import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { deleteLesson } from '../../apis/lessonAPI';
import Card from '../card/Card';
import CustomModal from '../../components/modal/CustomModal';
import './Lesson.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Lesson = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const allLessons = useSelector(
    (state) => state.lessons.allLessons?.listLessons,
  );
  const lessonToShow = allLessons?.find((lesson) => lesson?._id === id);
  const listCardOfLesson = lessonToShow && lessonToShow?.cards;

  const handleDeleteLesson = (idLesson) => {
    deleteLesson(user?.accessToken, dispatch, idLesson);
    alert(
      `You have deleted the lesson with name: ${lessonToShow?.description}. Wait a minute to see change`,
    );
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal
        open={open}
        handleClose={handleClose}
        lesson={lessonToShow}
        handleDeleteLesson={handleDeleteLesson}
      />
      {lessonToShow && user?.isAdmin && listCardOfLesson && (
        <div className="lesson-container">
          <div className="lesson-header-and-action">
            <div className="lesson-header">{lessonToShow.description}</div>
            <div className="lesson-action">
              <Button color="error" variant="contained" onClick={handleOpen}>
                Delete
              </Button>
              <NavLink to={`/edit-lesson/${lessonToShow?._id}`}>
                <Button color="warning" variant="contained">
                  Edit
                </Button>
              </NavLink>
            </div>
          </div>
          <hr />
          <div className="list-card-of-lesson">
            {listCardOfLesson?.map((card, index) => (
              <div key={index} className="card-of-lesson">
                <Card idCard={card} />
              </div>
            ))}
          </div>
        </div>
      )}

      {lessonToShow && !user?.isAdmin && listCardOfLesson && (
        <div className="name-lesson-of-user">
          <Item
            sx={{
              backgroundColor: '#e1d0c0',
              marginBottom: '5px',
              width: '80%',
            }}
          >
            <NavLink
              style={{ textDecoration: 'none' }}
              to={`lesson/${lessonToShow?._id}`}
            >
              {lessonToShow?.description}
            </NavLink>
          </Item>
        </div>
      )}

      {!listCardOfLesson && <div>Loading...</div>}
    </>
  );
};

export default Lesson;
