import React from 'react';
import NavBar from './NavBar';
import HeadLogo from './HeadLogo';
import url from '../globalVars';
import Button from './Button';
import Avatar from './Avatar';
import Loader from './Loader';
import { getStats } from './inject-stats';
import { Link } from 'react-router-dom';
import { capitalize } from './singleproject/PostedComment'

let MyProfile = (props) =>
    <div className="pageLayout">
        <NavBar />
        {props.user.collaborations && props.user.collaborations.length > 0 && <div className="collaborations">
            {props.user.collaborations.map(collaboration => (
                <div><i class="fa fa-exclamation-triangle red" aria-hidden="true"></i> Request for collaboration on <Link className="collaborations-link" to={`/editproject/${collaboration.project_id}`}>{collaboration.project_title}</Link></div>
            ))}
        </div>}
        <HeadLogo />
    
        <img className="profileImg" src={`${url}/uploads/avatar/${props.user.avatar}`} alt="profilepic" />
        <div className="profileHeadText">Welcome Back {props.user.name}!</div>
        <form className="myprofile" onSubmit={event => {
            event.preventDefault();
            props.editProfile(props.avatar);
        }}>
            <div>Upload a new profile image:</div>
            <Avatar update={props.update} image={props.avatar} />
            <Button text="Submit" />
        </form>
        {props.user.stats ?
        <div className="myprofile">
            <h3>{capitalize(props.user.name)}'s Creations</h3>
            <div>You have {props.user.stats.published} published projects.</div>
            <div>You have {props.user.stats.unpublished} unpublished projects.</div>
            <h3>{capitalize(props.user.name)}'s Inspirations</h3>
            <div>You have {props.user.stats.inprogress} projects you are currently working on.</div>
            <div>You have {props.user.stats.todo} projects you plan to work on soon.</div>
            <div>You have {props.user.stats.completed} projects you have completed on DIYHub.</div>
        </div>
        :
        <Loader/>
        }
    </div>

export default MyProfile;