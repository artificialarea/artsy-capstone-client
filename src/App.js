import './App.css';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'
import LandingPage from './components/home/LandingPage'
import SignIn from './components/home/SignIn'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import Feed from './components/timeline/Feed';
import Nav from './components/timeline/Nav'
import UploadPost from './components/post/UploadPost'
import EditPost from './components/post/EditPost'
import Home from './components/home/Home'
import PostSolo from './components/post/PostSolo'
import Footer from './components/timeline/Footer'
import FourOhFour from './components/FourOhFour'

function App() {
    return (
        <div className="App">
            <PrivateRoute path={['/profile/:id', '/posts/:postId', '/feed/:id', '/explore', '/upload', '/edit/:postId', '/edit-profile/:userId', '/about']} component={Nav} />
            <Switch>
                <Route exact path='/' render={r => <Home {...r} />} />
                <PublicOnlyRoute exact path='/login' component={SignIn} />
                <PrivateRoute path='/about' component={LandingPage} />
                <PrivateRoute path='/profile/:id' component={Profile} />
                <PrivateRoute path='/feed/:id' component={Feed} />
                <PrivateRoute path='/upload' component={UploadPost} />
                <PrivateRoute path='/edit/:postId' component={EditPost} />
                <PrivateRoute path='/edit-profile/:userId' component={EditProfile} />
                <Route 
                    exact path='/posts/:postId' 
                    render={props => (
                        <PostSolo {...props} />
                    )}
                />
                <Route component={FourOhFour} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
