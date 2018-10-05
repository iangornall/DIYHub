import React from 'react';
import NavBar from './NavBar';
import HeadLogo from './HeadLogo';
import url from '../globalVars';
import Button from './Button';

let MyProfile = (props) =>
    <div className="pageLayout">
        <NavBar />
        <HeadLogo />
        <img className="profileImg" src={`${url}/uploads/avatar/${props.user.avatar}`} />
        <div className="profileHeadText">Welcome Back {props.user.name}!</div>
        <form className="myprofile">
            <div>Upload a new profile image:</div>
            <div><input className="centerFileInput" type="file"/></div>
            <Button text="Submit" />
        </form>
        {console.log(props.user.stats)}
        {props.user.stats ?
        <div className="myprofile">
            <h3>Your Creations</h3>
            <div>{props.user.name}, you have {props.user.stats.published} published projects!</div>
            <div>{props.user.name}, you have {props.user.stats.unpublished} unpublished projects!</div>
            <h3>Your Inspirations</h3>
            <div>{props.user.name}, you have {props.user.stats.inprogress} projects you are currently working on!</div>
            <div>{props.user.name}, you have {props.user.stats.todo} projects you plan to work on soon!</div>
            <div>{props.user.name}, you have {props.user.stats.completed} projects you have completed on DIYHub!</div>
        </div>
        :
        <div>Not loaded</div>
        }
    </div>

export default MyProfile;