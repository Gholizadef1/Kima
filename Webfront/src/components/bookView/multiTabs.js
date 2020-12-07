import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//    //direction:"rtl",

//   },
// }));

export default function FullWidthTabs(props) {
    //console.log(props);
  //const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div 
    // className={classes.root}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="blue"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="خلاصه کتاب" {...a11yProps(0)} />
          <Tab label="نظر‌ها" {...a11yProps(1)} />
          <Tab label="نقل‌قول‌ها" {...a11yProps(2)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
         <TabPanel value={value} index={0} dir={theme.direction}>
          {props.bookdescription}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div>
            <List >
              <ListItem
                alignItems="flex-start"
                style={{direction:"rtl"}}
               >
                <ListItemAvatar>
                <Avatar alt="فاطمه" src="" />
                </ListItemAvatar>
                <ListItemText style={{textAlign:"right"}}
                  primary="فاطمه امیدی"
                  secondary={
                  <React.Fragment  >
                    <Typography  variant="body2" color="textPrimary" >
                    نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه

                    </Typography>
                    
                    {" نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که "}
                  </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>

            <List >
              <ListItem
                alignItems="flex-start"
                style={{direction:"rtl"}}
               >
                <ListItemAvatar>
                <Avatar alt="فاطمه" src="" />
                </ListItemAvatar>
                <ListItemText style={{textAlign:"right"}}
                  primary="فاطمه امیدی"
                  secondary={
                  <React.Fragment  >
                    <Typography  variant="body2" color="textPrimary" >
                    نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه

                    </Typography>
                    
                    {" نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که  نظر من اینه که "}
                  </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>


          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Two
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
