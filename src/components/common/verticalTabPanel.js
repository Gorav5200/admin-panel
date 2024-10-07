import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalPanel({data}) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newVlaue", newValue)
    console.log(data[newValue]?.path)
     const path = data[newValue]?.path; // Get the path for the selected tab
      if (path) {
        navigate(path);
      }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {data.map((item, ind) => (
          <Tab label={item.label}  {...a11yProps(ind)} key={ind} />
        ))}
      </Tabs>
          {data.map((item, index) => (
              <TabPanel
                  value={value}
                  index={index}
                 
                  key={index}
              >
                  {item.content}
              </TabPanel>))}
    </Box>
  );
}