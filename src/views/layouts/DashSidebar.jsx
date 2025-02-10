import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import {
  SpaceDashboard as SpaceDashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  TouchApp as TouchAppIcon,
  LocalShipping as LocalShippingIcon,
  PeopleOutline as PeopleOutlineIcon,
  CalendarMonth as CalendarMonthIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const DashSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        width: collapsed ? 80 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 240,
          boxSizing: 'border-box',
          backgroundColor: '#2E3B55',
          color: '#fff',
          transition: 'width 0.3s',
        },
      }}
    >
      <div style={{ padding: '20px 10px', display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={toggleSidebar}>
          <ArrowBackIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
      <List>
        {/* Dashboard Menu */}
        <ListItem button component={Link} to="/admin-dashboard">
          <ListItemIcon>
            <SpaceDashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Dashboard" />}
        </ListItem>
        
        {/* E-Commerce Section */}
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="E-Commerce" />}
        </ListItem>

        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <CategoryIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Products" />}
        </ListItem>

        <ListItem button component={Link} to="/sales">
          <ListItemIcon>
            <AttachMoneyIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sales" />}
        </ListItem>

        <ListItem button component={Link} to="/orders">
          <ListItemIcon>
            <TouchAppIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Orders" />}
        </ListItem>

        <ListItem button component={Link} to="/shipping">
          <ListItemIcon>
            <LocalShippingIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Shipping" />}
        </ListItem>

        <Divider sx={{ backgroundColor: '#ddd' }} />

        {/* Admin Management Section */}
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PeopleOutlineIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Users" />}
        </ListItem>

        <ListItem button component={Link} to="/calendar">
          <ListItemIcon>
            <CalendarMonthIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Calendar" />}
        </ListItem>

        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItem>

        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Profile" />}
        </ListItem>

        <Divider sx={{ backgroundColor: '#ddd' }} />

        {/* Sign Out */}
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sign Out" />}
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: '#ddd' }} />

      {/* Additional Sections */}
      <List>
        <ListItem button component={Link} to="/notifications">
          <ListItemIcon>
            <NotificationsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Notifications" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DashSidebar;
