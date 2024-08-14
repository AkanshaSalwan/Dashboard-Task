import React, { useState } from "react";
import "./App.css";
import { FaSearch, FaBell, FaUser, FaTrash } from "react-icons/fa";
import { Drawer, Button, Checkbox, FormControlLabel } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [value, setValue] = useState('1'); // Default to the first tab
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [dashboardWidgets, setDashboardWidgets] = useState({
    '1': [],
    '2': [],
    '3': [],
  });

  const [availableWidgets, setAvailableWidgets] = useState({
    '1': [{ name: 'Widget 1', text: 'Description for Widget 1' }],
    '2': [{ name: 'Widget 2', text: 'Description for Widget 2' }],
    '3': [{ name: 'Widget 3', text: 'Description for Widget 3' }],
  });

  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [mainSearchTerm, setMainSearchTerm] = useState(''); // State to store main dashboard search term

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleSlider = (open) => () => {
    setIsSliderOpen(open);
  };

  const handleClickOpen = (category) => () => {
    setValue(category); // Set the value to the selected category
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWidget = () => {
    if (widgetName.trim() === '' || widgetText.trim() === '') {
      return; // Optionally show an error or validation message
    }

    setAvailableWidgets(prevState => {
      const updatedWidgets = { ...prevState };
      if (!updatedWidgets[value]) {
        updatedWidgets[value] = [];
      }
      if (!updatedWidgets[value].find(w => w.name === widgetName)) {
        updatedWidgets[value].push({ name: widgetName, text: widgetText });
      }
      return updatedWidgets;
    });

    setDashboardWidgets(prevState => {
      const updatedWidgets = { ...prevState };
      if (!updatedWidgets[value]) {
        updatedWidgets[value] = [];
      }
      if (!updatedWidgets[value].find(w => w.name === widgetName)) {
        updatedWidgets[value].push({ name: widgetName, text: widgetText });
      }
      return updatedWidgets;
    });

    setWidgetName('');
    setWidgetText('');
    handleClose();
  };

  const handleRemoveWidget = (category, index) => {
    setDashboardWidgets(prevState => {
      const updatedWidgets = prevState[category].filter((_, i) => i !== index);
      return { ...prevState, [category]: updatedWidgets };
    });
  };

  const handleCheckboxChange = (widget, category) => (event) => {
    const checked = event.target.checked;
    if (checked) {
      setDashboardWidgets(prevState => {
        const updatedWidgets = { ...prevState };
        if (!updatedWidgets[category]) {
          updatedWidgets[category] = [];
        }
        if (!updatedWidgets[category].find(w => w.name === widget.name)) {
          updatedWidgets[category].push(widget);
        }
        return updatedWidgets;
      });
    } else {
      setDashboardWidgets(prevState => {
        const updatedWidgets = { ...prevState };
        if (updatedWidgets[category]) {
          const widgetIndex = updatedWidgets[category].findIndex(w => w.name === widget.name);
          if (widgetIndex > -1) {
            updatedWidgets[category].splice(widgetIndex, 1);
          }
        }
        return updatedWidgets;
      });
    }
  };

  const filteredWidgets = (category) => {
    return availableWidgets[category]?.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredDashboardWidgets = (category) => {
    return dashboardWidgets[category]?.filter(widget =>
      widget.name.toLowerCase().includes(mainSearchTerm.toLowerCase())
    );
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="container">
      {/* Header Section with Breadcrumb, Search Bar, and Icons */}
      <div className="header">
        <div className="breadcrumb">
          <span>Home</span> &gt; <span>Dashboard V2</span>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            value={mainSearchTerm}
            onChange={(e) => setMainSearchTerm(e.target.value)}
          />
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
          {filteredDashboardWidgets('1')?.map((widget, index) => (
            <div className="card" key={index}>
              <div className="card-text">
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
              <FaTrash className="remove-icon" onClick={() => handleRemoveWidget('1', index)} />
            </div>
          ))}
          <div className="card1">
            <button className="btn" onClick={handleClickOpen('1')}>+ Add Widget</button>
          </div>
        </div>
      </div>

      {/* Dialog for Adding Widgets */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="widget-name"
            label="Widget Name"
            type="text"
            fullWidth
            variant="outlined"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="widget-text"
            label="Widget Text"
            type="text"
            fullWidth
            variant="outlined"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddWidget}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* CWPP Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">CWPP Dashboard</h2>
        <div className="cards-container">
          {filteredDashboardWidgets('2')?.map((widget, index) => (
            <div className="card" key={index}>
              <div className="card-text">
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
              <FaTrash className="remove-icon" onClick={() => handleRemoveWidget('2', index)} />
            </div>
          ))}
          <div className="card1">
            <button className="btn" onClick={handleClickOpen('2')}>+ Add Widget</button>
          </div>
        </div>
      </div>

      {/* Registry Scan Section */}
      <div className="dashboard-section">
        <h2 className="dashboard-heading">Registry Scan</h2>
        <div className="cards-container">
          {filteredDashboardWidgets('3')?.map((widget, index) => (
            <div className="card" key={index}>
              <div className="card-text">
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
              </div>
              <FaTrash className="remove-icon" onClick={() => handleRemoveWidget('3', index)} />
            </div>
          ))}
          <div className="card1">
            <button className="btn" onClick={handleClickOpen('3')}>+ Add Widget</button>
          </div>
        </div>
      </div>

      {/* Drawer Section */}
      <Drawer anchor="right" open={isSliderOpen} onClose={toggleSlider(false)}>
        <div className="drawer-content">
          <h3>+ Add Widget</h3>
          <h4>Personalize Your DashBoard by Adding the Following widget</h4>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search widget..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="Widget categories">
                <Tab label="CSPM" value="1" />
                <Tab label="CWPP" value="2" />
                <Tab label="Registry Scan" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {filteredWidgets('1')?.map((widget, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={dashboardWidgets['1']?.some(w => w.name === widget.name)}
                      onChange={handleCheckboxChange(widget, '1')}
                    />
                  }
                  label={widget.name}
                />
              ))}
            </TabPanel>
            <TabPanel value="2">
              {filteredWidgets('2')?.map((widget, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={dashboardWidgets['2']?.some(w => w.name === widget.name)}
                      onChange={handleCheckboxChange(widget, '2')}
                    />
                  }
                  label={widget.name}
                />
              ))}
            </TabPanel>
            <TabPanel value="3">
              {filteredWidgets('3')?.map((widget, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={dashboardWidgets['3']?.some(w => w.name === widget.name)}
                      onChange={handleCheckboxChange(widget, '3')}
                    />
                  }
                  label={widget.name}
                />
              ))}
            </TabPanel>
          </TabContext>
        </div>

        {/* Buttons at the Bottom of the Drawer */}
        <div className="drawer-footer">
          <Button variant="contained" color="primary" onClick={toggleSlider(false)} style={{ marginRight: 8 }}>
            Confirm
          </Button>
          <Button variant="outlined" color="secondary" onClick={toggleSlider(false)}>
            Cancel
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
