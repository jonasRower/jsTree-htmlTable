
import genTable from './genTable.js';
import React, { useState } from 'react'

class vytvorVetvickyEl{

    constructor(dataSymb){
        this.ElOdbocka = this.vytvorElementyVsechnyRadkyOdbocky(dataSymb);
        //this.ElOdbocka = this.test();
        console.log(dataSymb);
    }

    getElOdbocka(){
        return(this.ElOdbocka);
    }


    test(){

        const [formValues, setFormValues] = useState([{ name: "", email : ""}])

        let addFormFields = () => {
            setFormValues([...formValues, { name: "", email: "" }])
        }

        let tableEl;
        let tdTableEl;

        tableEl = this.vytvorElementyProDanyTypOdbocky("T0");
        tdTableEl = <td className="tree" id="4-1">
                        {tableEl}
                    </td>
        
        let odbockaEl;
        odbockaEl = <table>
                        <div>
                            {formValues.map(() => (
                                tdTableEl
                            ))}
                            <div className="button-section">
                                <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                                <button className="button submit" type="submit">Submit</button>
                            </div>
                        </div>
                    </table>

        return (
            odbockaEl
        )

    }


    vytvorElementyVsechnyRadkyOdbocky(dataSymb){

        console.log(dataSymb);

        var radekSymb = dataSymb[2];

        //tohle nastudovat !!!!
        //jedna nebo druha varianta "vratOdbockyElProRadek2" nebo "vratOdbockyElProRadek"
        //------------
        var odbockaElRadek = this.vratOdbockyElProRadek2(radekSymb);
        //var odbockaElRadek = this.vratOdbockyElProRadek(radekSymb);
        //------------



        return(odbockaElRadek);

    }


    vytvorSymbolyRadekJson(radekSymb){

        var symbolyRadekJsonStr = '[\n';

        for (let i = 0; i < radekSymb.length; i++) {
            var symbol = radekSymb[i];
            var id = radekSymb.length - 1;
            var idMinus;

            if(id == 0){
                idMinus = '';
            }
            else{
                idMinus = '-' + id;
            }
            var radek1 = '           "symbol": "' + symbol + '",\n';
            var radek2 = '           "id": "4' + idMinus + '"\n';

            symbolyRadekJsonStr = symbolyRadekJsonStr + '       {\n';
            symbolyRadekJsonStr = symbolyRadekJsonStr + radek1;
            symbolyRadekJsonStr = symbolyRadekJsonStr + radek2;

            if(i == radekSymb.length - 1){
                symbolyRadekJsonStr = symbolyRadekJsonStr + '       }\n';
            }

            else{
                symbolyRadekJsonStr = symbolyRadekJsonStr + '       },\n';
            }
            
        }



        symbolyRadekJsonStr = symbolyRadekJsonStr + "]"
        console.log(symbolyRadekJsonStr);
        var symbolyRadekJson = JSON.parse(symbolyRadekJsonStr);

        return(symbolyRadekJson);


        /*
        symbolyRadekJsonStr =   'symboly: [{' + 
                                '           symbol: "T0",' +
                                '           id: "4-2"' +
                                '       },' +
                                '       {' +
                                '           symbol: "T0",' +
                                '           id: "4-1"' +
                                '       },' +
                                '       {' +
                                '           symbol: "T0",' +
                                '           id: "4"' +
                                '       }' +
                                ']' 
        */

    }


    vratOdbockyElProRadek2(radekSymb){

        var symbolyRadek = this.vytvorSymbolyRadekJson(radekSymb);
        console.log(symbolyRadek);

        /*
        var symbolyRadek = {
            symboly: [{
                            symbol: "T0",
                            id: "4-2"
                        },
                        {
                            symbol: "T0",
                            id: "4-1"
                        },
                        {
                            symbol: "T0",
                            id: "4"
                        }
                    ]
        }
        */


        var tableEl = this.vytvorElementyProDanyTypOdbocky("T0");
        var tdTableEl = <td className="tree" id="4-1">
                            {tableEl}
                        </td>

        return (
  
            <table border = "2">
                {                        
                    symbolyRadek.map(
                        (symbol) => 
                        <td key = {"aa"} className="tree" id={symbol.id}>
                            {tableEl}  
                        </td>
                    )
                }
                
            </table>

        )

    }


    vratTableElAll(radekSymb){

        var TableElAl = []

        for (let i = 0; i < radekSymb.length; i++) {
            var symbol = radekSymb[i];
            var tableEl = this.vytvorElementyProDanyTypOdbocky(symbol);
            TableElAl.push(tableEl);
        }
        

    }


    vratOdbockyElProRadek(radekSymb){

        var odbockaElRadek;
        const [formValues, setFormValues] = useState([{ name: "", email : ""}])

        let addFormFields = () => {
            setFormValues([...formValues, { name: "", email: "" }])
        }

        function addFormFields1(){
            setFormValues([...formValues, { name: "", email: "" }])
        }

        var tableEl;
        var tdTableEl;
        var tdTableElAll;


        for (let i = 0; i < 10; i++) {
            var typOdbocky = radekSymb[i];

            tableEl = this.vytvorElementyProDanyTypOdbocky("T0");
            tdTableEl = <td className="tree" id="4-1">
                            {tableEl}
                        </td>

            odbockaElRadek = <table>
                                <div>
                                    {formValues.map(() => (
                                        tdTableEl
                                    ))}
                                    
                                    <div className="button-section">
                                        <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                                    </div>
                                </div>
                            </table>

        }    

            /*
            odbockaElRadek = <table>
                            <div>
                                {formValues.map(() => (
                                    tdTableEl
                                ))}
                                <div className="button-section">
                                    <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                                    <button className="button submit" type="submit">Submit</button>
                                </div>
                            </div>
                        </table>
*/
        

        return(odbockaElRadek);

    }



    vytvorElementyProDanyTypOdbocky(typOdbocky){

        var table = [];
        var tBody = [];

        var trAll = this.vratElementyTrOdbocky(typOdbocky);

        tBody = <tbody>
                    {trAll}
                </tbody>

        table = <table cellSpacing="0" cellPadding="3">
                    {tBody}
                </table>


        return (
            table
            /*
            <table cellSpacing="0" cellpadding="3">
                <tbody>
                    <tr>
                        <td className="empty"></td>
                        <td className="fill"></td>
                        <td className="empty"></td>
                        <td className="empty"></td>
                    </tr>
                    <tr>
                        <td className="empty"></td>
                        <td className="fill"></td>
                        <td className="empty"></td>
                        <td className="empty"></td>
                    </tr>
                    <tr>
                        <td className="empty"></td>
                        <td className="fill"></td>
                        <td className="fill"></td>
                        <td className="fill"></td>
                    </tr>
                    <tr>
                        <td className="empty"></td>
                        <td className="fill"></td>
                        <td className="empty"></td>
                        <td className="empty"></td>
                    </tr>
                    <tr>
                        <td className="empty"></td>
                        <td className="fill"></td>
                        <td className="empty"></td>
                        <td className="empty"></td>
                    </tr>
                </tbody>
            </table>
            */

        )   
    }


    vratElementyTrOdbocky(typOdbocky){

        var trAll = [];

        var trEl1;
        var trEl2;
        var trEl3;
        var trEl4;
        var trEl5;


        if(typOdbocky == "T"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl3 = this.vratTableRow("empty", "fill", "fill", "fill");
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty");
        }


        if(typOdbocky == "T0"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl3 = this.vratTableRow("empty", "fill", "fill", "butt");
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty");
        }


        if(typOdbocky == "L"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl3 = this.vratTableRow("empty", "fill", "fill", "fill");
            trEl4 = this.vratTableRow("empty", "empty", "empty", "empty");
            trEl5 = this.vratTableRow("empty", "empty", "empty", "empty");
        }


        if(typOdbocky == "L0"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl3 = this.vratTableRow("empty", "fill", "fill", "butt");
            trEl4 = this.vratTableRow("empty", "empty", "empty", "empty");
            trEl5 = this.vratTableRow("empty", "empty", "empty", "empty");
        }


        if(typOdbocky == "I"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl3 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty");
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty");
        }


        var trAll = [];
        trAll.push(trEl1);
        trAll.push(trEl2);
        trAll.push(trEl3);
        trAll.push(trEl4);
        trAll.push(trEl5);

        return(trAll);

    }


    vratTableRow(clName1, clName2, clName3, clName4){

        var trEl = <tr>
            <td className={clName1}></td>
            <td className={clName2}></td>
            <td className={clName3}></td>
            <td className={clName4}></td>
        </tr>
   
        return(trEl);

    }


}


//zatim neni v kodu

function vratObsahTabulky(){

    var tabulka = [];
    var radekTabulky = [];

    radekTabulky.push("1");
    radekTabulky.push("2");
    radekTabulky.push("3");

    tabulka.push(radekTabulky);
    tabulka.push(radekTabulky);
    tabulka.push(radekTabulky);
    tabulka.push(radekTabulky);
    tabulka.push(radekTabulky);

    return(tabulka);

}


function vratCells(){

    const elTable = [];
    var elTabulka = vratObsahTabulky();

    for (let r = 0; r < elTabulka.length; r++) {
        const tableRow = [];
        for (let s = 0; s < elTabulka[r].length; s++) {
            var hodnotaBunky = elTabulka[r][s];
            tableRow.push(
                <td>{hodnotaBunky}</td>
            )
        }
        elTable.push(
            <tr>
                {tableRow}
            </tr>
        )

    };

    return (
        <table>
          <tbody>
            {elTable}
          </tbody>
        </table>
    )   

}


function TableEl(jsonData) {

    console.log(jsonData);

    var dataSymb = genTable(jsonData);
    var vetvickyCl = new vytvorVetvickyEl(dataSymb);
    var ElVetvicky = vetvickyCl.getElOdbocka();

    console.log(dataSymb);

    return (
        //tableSymb()
        //vratCells()
        ElVetvicky
    );

}


export default TableEl;