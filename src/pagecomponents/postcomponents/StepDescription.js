import React from 'react';

let StepDescription = (props) =>
    <div className="width80">
        <label className="flexC marginB">Step Description:
            <textarea className="width100 submitTextArea" onChange={(event) => 
                    props.update('stepdescription', event.target.value)
                } value={props.description} required></textarea>
        </label>
    </div>

export default StepDescription;