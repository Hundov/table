import * as React from "react";

const DropDown = (props) => {
    const callerRef = React.useRef();
    const dropDownRef = React.useRef();
    const [visibility, setVisibility] = React.useState(false);
    const [referenceWidths, setReferenceWidths] = React.useState({caller: "0", dropDown: "0"});

    const dropDownContainer = {
        display: `${visibility === false ? "none" : "block"}`,
        position: "absolute",
        transform: `translateX(${referenceWidths.caller/2 - referenceWidths.dropDown/2}px)`,
        marginTop: "10px",
        zIndex: "1000",
        backgroundColor: "#FFFFFF",
        minWidth: "2rem",
        width: "auto",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.8) 0px 5px 15px",
        padding: "0.2rem 0.4rem 0.2rem 0.4rem"
    };

    const dropDownUpArrow = {
        position: "absolute",
        transform: `translate(${referenceWidths.dropDown/2 - 10}px, -75%)`,
        border: "10px solid #000",
        borderColor: "transparent transparent #FFFFFF #FFFFFF",
    };

    const boxTopSide = {
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        borderBottom: "1px solid black"
    };

    const closeButton = {
        margin: "0px",
        cursor: "pointer",
        fontSize: "1.1rem",
        fontWeight: "bold"
    };

    React.useEffect(() => {
        if (callerRef.current && dropDownRef.current) {
            setReferenceWidths({
                caller: callerRef.current.children[0].clientWidth,
                dropDown: dropDownRef.current.clientWidth
            });
        };
    }, [visibility]);

    return(
        <div>
            <div ref = {callerRef} onClick = {(event) => setVisibility(!visibility)}>{props.caller}</div>
            <div ref = {dropDownRef} style = {dropDownContainer}>
                <span style = {dropDownUpArrow}/>
                <div>
                    <div style = {boxTopSide}>
                        <span onClick = {(event) => setVisibility(false)} style = {closeButton}>&#215;</span>
                    </div>
                    <div>{props.content}</div>
                </div>
            </div>
        </div>
    )
};

const ToolTip = (props) => {
    const callerRef = React.useRef();
    const dropDownRef = React.useRef();
    const [visibility, setVisibility] = React.useState(false);
    const [referenceWidths, setReferenceWidths] = React.useState({caller: "0", dropDown: "0"});

    const dropDownContainer = {
        display: `${visibility === false ? "none" : "block"}`,
        position: "absolute",
        transform: `translateX(${referenceWidths.caller/2 - referenceWidths.dropDown/2}px)`,
        marginTop: "10px",
        zIndex: "1000",
        backgroundColor: "#FFFFFF",
        minWidth: "2rem",
        width: "auto",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.8) 0px 5px 15px",
        padding: "0.2rem 0.4rem 0.2rem 0.4rem"
    };

    const dropDownUpArrow = {
        position: "absolute",
        transform: `translate(${referenceWidths.dropDown/2 - 10}px, -75%)`,
        border: "10px solid #000",
        borderColor: "transparent transparent #FFFFFF #FFFFFF",
    };

    React.useEffect(() => {
        if (callerRef.current && dropDownRef.current) {
            setReferenceWidths({
                caller: callerRef.current.children[0].clientWidth,
                dropDown: dropDownRef.current.clientWidth
            });
        };
    }, [visibility]);

    return(
        <div>
            <div ref = {callerRef} onMouseEnter = {(event) => setVisibility(true)} onMouseLeave = {(event) => setVisibility(false)}>{props.caller}</div>
            <div ref = {dropDownRef} style = {dropDownContainer}>
                <span style = {dropDownUpArrow}/>
                <div>
                    <div>{props.content}</div>
                </div>
            </div>
        </div>
    )
};

export {DropDown, ToolTip};

