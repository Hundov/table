import * as React from "react";

function PopUp(props) {
    const setVisibility = props.toggle;

    const popUpBox = {
        position: "fixed",
        zIndex: "1",
        backgroundColor: "#FFFFFF",
        minWidth: "2rem",
        width: "auto",
        height: "auto",
        left: "17.5%",
        top: "3%",
        borderRadius: "8px",
        marginTop: "0.2rem",
        boxShadow: "rgba(0, 0, 0, 0.8) 0px 5px 15px",
        padding: "0.2rem 0.4rem 0.2rem 0.4rem"
    };

    const popUpArrow = {
        position:"absolute",
        left:"20%",
        top:"5%",
        transform:"translateY(-100%)",
        border:"10px solid #000",
        borderColor: "transparent transparent #FFFFFF transparent",
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

    return(
        <div style = {popUpBox}>
            <span style = {popUpArrow}/>
            <div>
                <div style = {boxTopSide}>
                    <span onClick = {(event) => setVisibility(false)} style = {closeButton}>&#215;</span>
                </div>
                <div>{props.content}</div>
            </div>
        </div>
    )
};

export default PopUp;