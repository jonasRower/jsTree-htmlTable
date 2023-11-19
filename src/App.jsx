import React from 'react';
//import './css/App.css'
import './css/vetvicky.css'
import './css/styles.css'
import jsTree from "./components/jsTree.json";
import coloredText from "./components/coloredText.json";


import TableEl from './components/table';


function App() {

    console.log(jsTree);
        
    function handleClick() {
        console.log('Button click ...');
    }

    return (

        <main>
            <TableEl data={jsTree}></TableEl>
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


