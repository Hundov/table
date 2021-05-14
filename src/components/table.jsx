import * as React from "react";
import {GridContainer} from "./grid";
import Text from "./Text";
import PopUp from "./popUp";

const fieldBuilder = (draft) => {
    if (draft === undefined) return null;
    
    var fields = [];

    draft.reduce((acc, val) => {
        draft.map(row => (
            row.map(item => (
                fields.includes(item.bracket) ? null : fields.push(item.bracket)
            ))
        ));
    });

    return fields;
};

const recordBuilder = (draft, fieldsFilter, fieldOrderState) => {
    if (draft === undefined) return null;

    var records = [];

    for (var x = 0; x < draft.length; x++) {
        var record = new Array();
        for (var i = 0; i < fieldsFilter.length; i++) {
            if (draft[x].some(row => row.bracket === fieldsFilter[i]) === true) {
                for (var z = 0; z < draft[x].length; z++) {
                    if (fieldsFilter[i] === draft[x][z].bracket) {
                        record.splice(fieldsFilter.indexOf(fieldsFilter[i]), 0, draft[x][z].value);
                    };
                };
            } else {
                record.splice(fieldsFilter.indexOf(fieldsFilter[i]), 0, "");
            };
        };

        records.push(record);
    };

    const tableArrangement = (tableRows) => {
        const compare = (a, b) => {
            if (a[fieldOrderState] < b[fieldOrderState]) {
                return -1;
            };    
            if (b[fieldOrderState] > a[fieldOrderState]) {
                return 1;
            };   
            return 0;
        };
    
        if (typeof fieldOrderState === "number") {
            tableRows.sort(compare);
        };
    
        if (typeof fieldOrderState === "string") {
            tableRows.sort(compare).reverse();
        };
    };

    tableArrangement(records);
    
    return records;
};

function Table(props) {
    const draft = props.draft;
    const fields = fieldBuilder(draft);
    const [fieldOrderState, setFieldOrderState] = React.useState();
    const [fieldsFilter, setFieldsFilter] = React.useState([...fields]);
    const [visibility, setVisibility] = React.useState(false);
    const records = recordBuilder(draft, fieldsFilter, fieldOrderState);
    const fieldLength = fieldsFilter !== null ? fieldsFilter.length : 0;
    const recordLength = records !== null ? draft.length : 0;

    const fieldOrderUpdater = (index) => {
        if (fieldOrderState !== index) {
            setFieldOrderState(index);
        } else {
            setFieldOrderState(`${index}`);
        };
    };

    const fieldsFilterUpdater = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;

        if (checked === true) {
            var columnFilterCopy = [...fieldsFilter];
            columnFilterCopy.splice(fields.indexOf(name), 0, name);
            setFieldsFilter(columnFilterCopy);
        } else {
            setFieldsFilter(fieldsFilter.filter(item => item !== name));
        };
    };

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            const str1 = fieldsFilter.join("\t");
            const arrayOfStrings = records.map(line => line.join("\t"));
            const str2 = arrayOfStrings.join("\n");
            const copiableString = str1 + "\n" + str2;
            navigator.clipboard.writeText(copiableString);
        };
    };

    const tableContainer = {
        width: "fit-content"
    };

    const tableStyle = {
        border: "0.01rem solid black",
        width: "fit-content",
    };

    const cellStyle = {
        border: "0.01rem solid black",
        margin: "0px",
        padding: "0rem 0.5rem",
        textAlign: "center",
    };

    const fieldStyle = {
        border: "0.01rem solid black",
        margin: "0px",
        padding: "0rem 0.5rem",
        textAlign: "center",
        userSelect: "none",
        cursor: "pointer",
        fontWeight: "bold",
    };

    const icons = {
        width: "16px",
        heigth: "16px",
        alignText: "center",
        padding: "1px",
        outline: "0.1px solid black",
        cursor: "pointer"
    };

    return (
        <GridContainer style = {tableContainer} rows = "auto auto" gap = "0.1rem">
            <GridContainer columns = "8fr 1fr 1fr">
                <Text>{props.title}</Text>
                <img style = {icons} onClick = {(event) => setVisibility(!visibility)} src = "gear.svg"/>
                {visibility ? <PopUp toggle = {setVisibility} content = {
                    fields.map(field => (
                        <label><input name = {field} type = "checkbox" defaultChecked = {fieldsFilter.indexOf(field) !== -1 ? true : false} onChange = {(event) => fieldsFilterUpdater(event)}/>{field}</label>
                    ))
                }/> : null}
                <img style = {icons} onClick = {(event) => copyToClipboard()} src = "clipboard.svg"/>
            </GridContainer>
            <GridContainer className = "table" rows = {`repeat(${props.showField === false ? recordLength : recordLength + 1}, 1fr)`} columns = {`repeat(${fieldLength}, 1fr)`} style = {tableStyle}>
                {props.showField === false || fieldsFilter === null ? null : 
                    fieldsFilter.map(field => (
                        <Text className = "cells fields" onClick = {(event) => fieldOrderUpdater(fields.indexOf(field))} style = {fieldStyle}>{field}</Text>
                ))}
                {records === null ? null : 
                    records.map(record => (
                        record.map(cell => (
                            <Text className = "cells records" style = {cellStyle}>{cell}</Text>
                    ))
                ))}
            </GridContainer>
        </GridContainer>
    );
};

export default Table;

