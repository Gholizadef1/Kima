import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./Tabs.css";
import RenderRowquote from"./renderRowQuote";
import RenderRowcomment from "./renderRowComment";
import Scroll from "../Components/Scroll";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import React, { useState, useEffect } from "react";
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function FullWidthTabs() {
  //const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      
      height: 100,
      backgroundColor: theme.palette.background.paper,
    },
  }));
 
    const classes = useStyles();
  return (
    <div className="root">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label=" نقل‌قول‌ها" {...a11yProps(2)}style={{fontSize:18,fontFamily:"Yekan",color:"black"}} />
          <Tab label=" نظر‌ها" {...a11yProps(1)}style={{fontSize:18,fontFamily:"Yekan",color:"black"}} />
          <Tab label="کتاب‌های من" {...a11yProps(0)}style={{fontSize:18,fontFamily:"Yekan",color:"black"}} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FixedSizeList className="fixedlist" height={400} width={650} itemSize={150} itemCount={1}>
          {RenderRowquote}
      </FixedSizeList>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
      <FixedSizeList height={400} width={650} itemSize={150} itemCount={1}>
      {RenderRowcomment}
      </FixedSizeList>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} height={400}>
        <Scroll/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
