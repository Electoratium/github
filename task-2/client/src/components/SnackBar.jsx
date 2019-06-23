import React, { PureComponent } from 'react';
import MaterialSnackbar from '@material-ui/core/Snackbar';

class SnackBar extends PureComponent {
    state = {
        open: true,
        position: {
            vertical: 'bottom',
            horizontal: 'left',
        }
    };

    handleClose = ()  => {
        this.setState({open: false});
    };
    render () {
        return (
            <div>
              <MaterialSnackbar
                anchorOrigin={this.state.position}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={4000}
                message={this.props.message}
              />
            </div>
        );
    }

}
export default SnackBar;