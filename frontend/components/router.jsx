import React from 'react';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './App';
import HomePageContainer from './home/home_page_container';
import SearchPageContainer from './search/search_page_container';
import SpotShowPageContainer from './spot_show/spot_show_page_container';
//Actions
import { openWhereTo, closeWhereTo } from '../actions/whereto_actions';
import { splashOn, splashOff } from '../actions/splash_actions';
import { requestSpots } from '../actions/spots_actions';
import { requestBookings } from '../actions/booking_actions';
import { requestSpotReviews, requestUserReviews }
  from '../actions/review_actions';

class AppRouter extends React.Component{
  constructor(props){
    super(props);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);
    this._activateWhereTo = this._activateWhereTo.bind(this);
    this._turnOffWhereTo = this._turnOffWhereTo.bind(this);
    this._activateSplash = this._activateSplash.bind(this);
    this._turnOffSplash = this._turnOffSplash.bind(this);
    this._requestSpots = this._requestSpots.bind(this);
    this._requestSpotShowInfo = this._requestSpotShowInfo.bind(this);
    // this._requestUserReviews = this._requestUserReviews.bind(this);
  }

  _ensureLoggedIn(nextState, replace){
    const currentState = this.context.store.getState();
    const currentUser = currentState.session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  }

  _redirectIfLoggedIn(nextState, replace){
    const currentState = this.context.store.getState();
    const currentUser = currentState.session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  _activateWhereTo() {
    this.context.store.dispatch(openWhereTo());
  }

  _turnOffWhereTo() {
    this.context.store.dispatch(closeWhereTo());
  }

  _activateSplash() {
    this.context.store.dispatch(splashOn());
  }

  _turnOffSplash() {
    this.context.store.dispatch(splashOff());
  }

  _requestSpots() {
    this.context.store.dispatch(requestBookings());
    this.context.store.dispatch(requestSpots());
  }

  _requestSpotShowInfo(nextState) {
    let spotId = nextState.params.spotId;
    this.context.store.dispatch(requestSpotReviews(spotId));
  }

  // _requestUserReviews(nextState) {
  //   let userId = nextState.params.userId;
  //   this.context.store.dispatch(requestUserReviews(userId));
  // }

  render(){
    return(
      <Router history={ hashHistory }>
        <Route path="/" component={ App } onEnter={ this._requestSpots }>
          <IndexRoute component={ HomePageContainer }
            onEnter={ this._activateSplash }
            onLeave={ this._turnOffSplash } />
          <Route path="/search" component={ SearchPageContainer }
            onEnter={ this._activateWhereTo }
            onLeave={ this._turnOffWhereTo }/>
          <Route path="/spots/:spotId" component={ SpotShowPageContainer }
            onEnter={ this._requestSpotShowInfo }/>
        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
