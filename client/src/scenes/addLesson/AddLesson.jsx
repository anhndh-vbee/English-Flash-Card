// import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material"
// import { useState } from "react";

// const AddLessonForm = () => {

//     const [description, setDescription] = useState('');

//     const handleShowAddLesson = () => {
//         if (document.getElementById('inputCard').style.display == 'none') {
//             document.getElementById('inputCard').style.display = ''
//         } else {
//             document.getElementById('inputCard').style.display = 'none'
//         }
//     }

//     return (
//         <>
//             <div className="add-lesson-form-container">
//                 <div className="add-lesson-form-header">
//                     Add new lesson
//                 </div>
//                 <form className="form-add-lesson-main">
//                     <FormControl variant="standard" sx={{ m: 1 }}>
//                         <InputLabel htmlFor="description">Name</InputLabel>
//                         <Input
//                             id="description"
//                             aria-describedby="description"
//                             inputProps={{
//                                 'aria-label': 'weight',
//                             }}
//                             type='text'
//                             required={true}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                         <FormHelperText id="description">Enter lesson name</FormHelperText>
//                     </FormControl>

//                     <Button color="warning" variant="contained" onClick={handleShowAddLesson}>Do you want to add any card to this lesson?</Button>

//                     <FormControl id="inputCard" variant="standard" sx={{ m: 1 }}>
//                         <InputLabel htmlFor="card">Card</InputLabel>
//                         <Input
//                             id="card"
//                             aria-describedby="card"
//                             inputProps={{
//                                 'aria-label': 'weight',
//                             }}
//                             type='text'
//                         // onChange={(e) => setDescription(e.target.value)}
//                         />
//                         <FormHelperText id="card">Enter card id</FormHelperText>
//                     </FormControl>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default AddLessonForm;
