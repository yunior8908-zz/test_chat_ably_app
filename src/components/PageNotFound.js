import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    textAlign: 'center',
    margin: 'auto',
    marginTop: '25%',
    '& > *': {
      fontSize: 36,
      fontWeight: 700,
      color: '#666666'
    }
  }
});

function PageNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">404 - Page not found</Typography>
    </div>
  );
}

export default PageNotFound;
