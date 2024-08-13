import React, { useState } from "react";
import "./App.css";
import Cloud from "../src/images/cloud.png";
import Google from "../src/images/google.png";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { Drawer, List, ListItem, Checkbox, ListItemText, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import FormControlLabel from '@mui/material/FormControlLabel';




function App() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleSlider = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSliderOpen(open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = selectedWidgets.indexOf(value);
    const newChecked = [...selectedWidgets];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedWidgets(newChecked);
  };



  const widgets = ["Widget 1", "Widget 2", "Widget 3"]; // Example widget options

  return (
    <div className="container">
      {/* Header Section with Breadcrumb, Search Bar, and Icons */}
      <div className="header">
        <div className="breadcrumb">
          <span>Home</span> &gt; <span>Dashboard V2</span>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-icons">
          <FaBell className="icon" />
          <FaUser className="icon" />
        </div>
      </div>

      {/* Toolbar Section - Aligned to the Right */}
      <div className="toolbar">
        <div className="toolbar-right">
          <button className="add-widget-button" onClick={toggleSlider(true)}>
            + Add Widget
          </button>
          <div className="dropdown">
            <select className="dropdown-select">
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="options-menu">
            <button className="menu-button">⋮</button>
          </div>
        </div>
      </div>

      {/* CSPM Executive Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">CSPM Executive Dashboard</h2>
        <div className="cards-container">
          <div className="card">
            <img src={Cloud} alt="Cloud" />
            <div className="card-text">
              <h3>Cloud Accounts</h3>
              <p>Manage your cloud accounts efficiently.</p>
            </div>
          </div>
          <div className="card">
            <img src={Google} alt="Google" />
            <div className="card-text">
              <h3>Cloud Account Risk Assessment</h3>
              <p>Evaluate risks in your cloud environment.</p>
            </div>
          </div>
          <div className="card1"><button className="btn">+  Add Widget</button></div>
        </div>
      </div>

      {/* CWPP Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">CWPP Dashboard</h2>
        <div className="cards-container">
          <div className="card">
            <div className="card-text">
              <h3>Top 5 Namespace Specific Alerts</h3>
              <p>Monitor specific alerts in your namespaces.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-text">
              <h3>Workload Alerts</h3>
              <p>Stay updated with workload-related alerts.</p>
            </div>
          </div>
          <div className="card1"><button className="btn">+  Add Widget</button></div>
        </div>
      </div>

      {/* Registry Scan Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">Registry Scan</h2>
        <div className="cards-container">
          <div className="card">
            <div className="card-text">
              <h3>Image Risk Assessment</h3>
              <p>Assess risks associated with your images.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-text">
              <h3>Image Security Issues</h3>
              <p>Identify and resolve security issues in images.</p>
            </div>
          </div>
          <div className="card1"><button className="btn">+  Add Widget</button></div>
        </div>
      </div>

      {/* Material UI Drawer for the Widget Slider */}
      <Drawer anchor="right" open={isSliderOpen} onClose={toggleSlider(false)}>
        <div className="drawer-header">
          <h2>Add Widget</h2>
        </div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="CSPM" value="1" />
                <Tab label="CWPP" value="2" />
                <Tab label="Registry Scan" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 1" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 2 " />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 3 " />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 4 " />


            </TabPanel>
            <TabPanel value="2">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 1" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 2 " />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 3 " />
              


            </TabPanel>

            <TabPanel value="3">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 1" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Widget 2 " />
             


            </TabPanel>


          </TabContext>
        </Box>
        <div className="drawer-footer">
          <Button variant="outlined" color="secondary" onClick={toggleSlider(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSlider(false)}>
            Confirm
          </Button>

        </div>
      </Drawer>
    </div>
  );
}

export default App;
