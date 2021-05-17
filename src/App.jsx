import React from "react";
import Table from "./components/table";

const array = [
    [
        {
            bracket: "Champion",
            value: "Kled"
        },
        {
            bracket: "Games played",
            value: "19"
        },
        {
            bracket: "Previous Winrate",
            value: "40%"
        },
        {
            bracket: "Current Winrate",
            value: "53%"
        }
    ],
    [
        {
            bracket: "Champion",
            value: "Vladimir"
        },
        {
            bracket: "Games played",
            value: "17"
        },
        {
            bracket: "Previous Winrate",
            value: "45%"
        },
        {
            bracket: "Current Winrate",
            value: "53%"
        }
    ],
    [
        {
            bracket: "Champion",
            value: "Sett"
        },
        {
            bracket: "Games played",
            value: "30"
        },
        {
            bracket: "Previous Winrate",
            value: "57%"
        },
        {
            bracket: "Current Winrate",
            value: "60%"
        },
        
    ],
];

export default (props) => (
	<div className="App">
        <Table draft = {array}/>
	</div>
);