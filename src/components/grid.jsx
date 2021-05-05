import * as React from "react";

const GridContainer = (props) => {
    const nodeRef = React.useRef();

    const gridProperties = () => {
        const gridSettings = {
            display: "grid",
            gridTemplateColumns: props.columns,
            gridTemplateRows: props.rows,
            gridTemplateAreas: props.areas,
            gap: props.gap,
            gridArea: props.gridArea,
            placeItems: props.placeItems,
            placeContent: props.placeContent,
        };

        const gridBorder = (border) => {
            const styles = {
                rounded: {
                    borderRadius: "18px"
                },

                square: {
                    borderRadius: "0px"
                }
            };

            if (border === undefined || border === "") {
                return {
                    borderRadius: styles.square.borderRadius
                };
            } else {
                const spliter = border.split(".");

                if (spliter.length === 1) {
                    if (styles[border]) {
                        return {
                            borderRadius: styles[border].borderRadius
                        };
                    } else {
                        return {
                            border: `${border}`
                        };
                    };
                };

                if (spliter.length === 2) {
                    if (styles[spliter[1]]) {
                        return {
                            border: `${spliter[0]}`,
                            borderRadius: styles[spliter[1]].borderRadius
                        };
                    } else {
                        return {
                            border: `${spliter[0]}`,
                            borderRadius: `${spliter[1]}`
                        };
                    };
                };
            };
        };

        const cssSettings = {...gridSettings, ...gridBorder(props.border), ...props.style};

        return cssSettings;
    };

    React.useEffect(() => {
        if (nodeRef.current) {
            nodeRef.current.classList.add(props.gridArea);
        };
    }, [props.gridArea]);

    return <div id = {props.id} className = {props.className} ref = {nodeRef} style = {gridProperties()}>{props.children}</div>;
};

const GridElement = (props) => {
    const nodeRef = React.useRef();
    const gridSettings = {
        display: "grid",
        gridArea: props.gridArea,
        placeSelf: props.placeSelf,
    };

    React.useEffect(() => {
        if (nodeRef.current) {
            nodeRef.current.classList.add(props.gridArea);
        };
    }, [props.gridArea]);

    return <div id = {props.id} className = {props.className} ref = {nodeRef} style = {gridSettings}>{props.element}</div>;
};

export {GridContainer, GridElement};