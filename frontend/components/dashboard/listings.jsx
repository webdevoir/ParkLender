import React from 'react';
import { withRouter } from 'react-router';
import Tabs from './tabs';

class Listings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='dashboard-container'>
        <Tabs
          router={this.props.router}
          pathname={this.props.location.pathname}
        />
        <div className='dashboard'>
          <h1>Your Listings</h1>
          <h2>In construction</h2>
        </div>
      </div>
    );
  }
}

export default withRouter(Listings);
