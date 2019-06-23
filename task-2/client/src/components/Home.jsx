import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import User from '../containers/User';
import withAuth from '../hoc/withAuth';

class Home extends PureComponent {

  render () {
    return (
      <Container maxWidth="sm">
        <User />
      </Container>
    );
  }
}

export default withAuth(Home);
