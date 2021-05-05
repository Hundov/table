import * as React from "react";

function Text(props) {
    const functionAssignment = () => {
        const onClickFunction = props.onClick
        if(onClickFunction === "" || onClickFunction === undefined) {
            return null;
        } else {
            onClickFunction();
        };
    };
    
    return(
        <div className = {props.className} onClick = {() => functionAssignment()} style = {props.style}>{props.children}</div>
    );
};

export default Text;