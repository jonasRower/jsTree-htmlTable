import React from 'react';
//import './css/App.css'
import './css/vetvicky.css'
import './css/styles.css'
import jsonData from "./components/dataJson.json";

import TableEl from './components/table';


function App() {

    console.log(jsonData);
        
    function handleClick() {
        console.log('Button click ...');
    }

    return (

        <main>
            <TableEl data={jsonData}></TableEl>
        </main>

        /*
        <div>
        <button type="button" onClick={handleClick}>
            Event Handler
        </button>
        </div>
        */
    
    );
    }



export default App


