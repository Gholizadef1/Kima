import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./Tabs.css";
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
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  function renderRowQuote(props) {
    const { index, style } = props;
    return (
      <div>
        <ListItem alignItems="flex-start">
        <ListItem
          alignItems="flex-start"
          style={{direction:"rtl"}}
         >
          <ListItemText style={{textAlign:"right"}}
            primary="کتاب ایکس"
            secondary={
            <React.Fragment  >
              {" اثینبزدزتباعjhdhkeudheukdhjujfhudehfkudfhjkudjfhudjhfuejkhdfbujhfujdehcdujhcdjبثباعثنباعتباتعیلازعثتیلتثغسلایزتثلیتثغلیتثغنظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که "}
            </React.Fragment>
            }
          />
        </ListItem>
      </ListItem>
  
      </div>
    );
  }
 
  renderRowQuote.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
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
          <Tab label="آخرین نقل‌قول‌ها" {...a11yProps(0)}style={{fontSize:18,fontFamily:"Mitra",color:"black"}} />
          <Tab label="آخرین کامنت‌ها" {...a11yProps(1)}style={{fontSize:18,fontFamily:"Mitra",color:"black"}} />
          <Tab label="کتاب‌های من" {...a11yProps(2)}style={{fontSize:18,fontFamily:"Mitra",color:"black"}} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FixedSizeList height={400} width={700} itemSize={150} itemCount={20}>
      
          {renderRowQuote}
        
      </FixedSizeList>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div className={classes.root}>
      <FixedSizeList height={400} width={700} itemSize={150} itemCount={200}>
      
     
        {RenderRowComment}
        
      </FixedSizeList>
    </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Scroll/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
