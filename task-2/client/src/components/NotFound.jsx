import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function NotFound () {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Not found!
      </Typography>
    </Container>
  );
}

export default NotFound;
