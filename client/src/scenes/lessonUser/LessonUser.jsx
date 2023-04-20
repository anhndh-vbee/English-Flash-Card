import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../containers/card/Card';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const LessonUser = () => {
  const { id } = useParams();
  const allLessons = useSelector(
    (state) => state.lessons.allLessons?.listLessons,
  );
  const lessonUser = allLessons.find((lesson) => lesson?._id === id);
  const cardUserOfLesson = lessonUser && lessonUser?.cards;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [count, setCount] = React.useState(0);

  const handlComplete = () => {
    setCount(count + 1);
    if (count === allLessons.length) alert('You complete this lesson');
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#e1d0c0', height: '90vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {cardUserOfLesson?.map((card, indexCard) => (
            <Tab
              onClick={handlComplete}
              label={indexCard + 1}
              {...a11yProps(indexCard)}
            />
          ))}
        </Tabs>
      </Box>
      {cardUserOfLesson?.map((card, indexCard) => (
        <TabPanel value={value} index={indexCard}>
          <Card idCard={card} key={indexCard} isCardInLesson={true} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default LessonUser;
