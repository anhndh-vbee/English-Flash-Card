import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal(props) {
  const {
    open,
    handleClose,
    card,
    lesson,
    handleDeleteCard,
    handleDeleteLesson,
  } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure want to delete this {card && <span>card</span>}{' '}
          {lesson && <span>lesson</span>}?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {card && (
            <Button
              color="warning"
              variant="contained"
              onClick={() => handleDeleteCard(card?._id)}
            >
              Delete
            </Button>
          )}
          {lesson && (
            <Button
              color="warning"
              variant="contained"
              onClick={() => handleDeleteLesson(lesson?._id)}
            >
              Delete
            </Button>
          )}
        </Typography>
      </Box>
    </Modal>
  );
}
