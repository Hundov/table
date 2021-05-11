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
            value: "10"
        },
        {
            bracket: "Winrate",
            value: "40%"
        }
    ],
    [
        {
            bracket: "Champion",
            value: "Vladimir"
        },
        {
            bracket: "Games played",
            value: "11"
        },
        {
            bracket: "Winrate",
            value: "45%"
        }
    ],
    [
        {
            bracket: "Champion",
            value: "Sett"
        },
        {
            bracket: "Games played",
            value: "14"
        },
        {
            bracket: "Winrate",
            value: "57%"
        }
    ],
];


export default (props) => (
	<div className="App">
        <Table draft = {array}/>
	</div>
);