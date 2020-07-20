import React from 'react';
import { AppBar, Toolbar, IconButton, Box, useMediaQuery, useTheme } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import IconMenuComponent from './IconMenuComponent';

function TopBarAppComponent() {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(search);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    history.push({ pathname });
  };

  return (
    <>
      {urlSearchParams.get('name') && (
        <AppBar position="static">
          <Toolbar>
            <div style={{ flexGrow: 1 }} />
            <Box textAlign="right">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClose}>
                <ExitToApp />
              </IconButton>
              {match ? <IconMenuComponent /> : null}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

export default TopBarAppComponent;
