import * as React from "react";
import {GridContainer} from "./grid";
import Text from "./Text";

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

const recordBuilder = (draft, fields, state) => {
    if (draft === undefined) return null;

    var records = [];
    for (var x = 0; x < draft.length; x++) {
        var record = new Array();
        for (var i = 0; i < fields.length; i++) {
            if (draft[x].some(row => row.bracket === fields[i]) === true) {
                for (var z = 0; z < draft[x].length; z++) {
                    if (fields[i] === draft[x][z].bracket) {
                        record.splice(fields.indexOf(fields[i]), 0, draft[x][z].value);
                    };
                };
            } else {
                record.splice(fields.indexOf(fields[i]), 0, "");
            };
        };

        records.push(record);
    };

    const tableArrangement = (tableRows) => {
        const compare = (a, b) => {
            if (a[state] < b[state]) {
                return -1;
            };    
            if (b[state] > a[state]) {
                return 1;
            };   
            return 0;
        };
    
        if (typeof state === "number") {
            tableRows.sort(compare);
        };
    
        if (typeof state === "string") {
            tableRows.sort(compare).reverse();
        };
    };

    tableArrangement(records);
    
    return records;
};

function Table(props) {
    const [state, setState] = React.useState();
    const draft = props.draft;
    const fields = fieldBuilder(draft);
    const records = recordBuilder(draft, fields, state);
    const fieldLength = fields !== null ? fields.length : 0;
    const recordLength = records !== null ? draft.length : 0;

    const clickHandler = (index) => {
        if (state !== index) {
            setState(index);
        } else {
            setState(`${index}`);
        };
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

    return (
        <>
        <Text>{props.tablename}</Text>
        <GridContainer className = "table" rows = {`repeat(${props.field === false ? recordLength : recordLength + 1}, 1fr)`} columns = {`repeat(${fieldLength}, 1fr)`} style = {tableStyle}>
            {props.field === false || fields === null ? null : 
                fields.map(field => (
                    <Text className = "cells fields" onClick = {(event) => clickHandler(fields.indexOf(field))} style = {fieldStyle}>{field}</Text>
            ))}
            {records === null ? null : 
                records.map(record => (
                    record.map(cell => (
                        <Text className = "cells records" style = {cellStyle}>{cell}</Text>
                ))
            ))}
        </GridContainer>
        </>
    );
};

export default Table;