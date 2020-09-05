import React, { useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import SearchBar from "./SearchBar"
import SearchIcon from "@material-ui/icons/Search"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Backdrop from "@material-ui/core/Backdrop"
import Typography from "@material-ui/core/Typography"
import Zoom from "@material-ui/core/Zoom"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
// import EditIcon from '@material-ui/icons/Edit';
import UpIcon from "@material-ui/icons/KeyboardArrowUp"
import { green } from "@material-ui/core/colors"
import Box from "@material-ui/core/Box"

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const a11yProps = (index) => {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 375,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}))

const TopNav = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [searchEnabled, setSearchEnabled] = useState(false)
    let searchBar = ''
  
  
  const handleToggle = (e) => {
    console.log("This is triggering")
    console.log(searchEnabled)
    setSearchEnabled(!searchEnabled)
  }

  const handleSearchBar = () => {
    if (searchEnabled === true) {
        searchBar = <SearchBar />
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "inherit",
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: "Expand",
    },
  ]

  return (
    <div className="header-tab">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example">
          <Tab label="Following" {...a11yProps(0)} />
          <Tab label="Hashtags" {...a11yProps(1)} />
          <Tab label={<SearchIcon />} onClick={handleToggle} />
        </Tabs>
        {searchBar}
      </AppBar>
    </div>
  )
}
export default TopNav
