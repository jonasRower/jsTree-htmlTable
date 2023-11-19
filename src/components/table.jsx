
import genTable from './genTable.js';
import React, { useState } from 'react'





//#########################################
//nakresli jednu odbocku, tj. odpocka, nebokoleno, neo svisla nebo nic
//
//Napr. muze vypadat takto:
//
//  <tr>
//      <td class="empty"></td>
//      <td class="fill"></td>
//      <td class="empty"></td>
//      <td class="empty"></td>
//  </tr>
//  <tr>
//      <td class="empty"></td>
//      <td class="fill"></td>
//      <td class="empty"></td>
//      <td class="empty"></td>
//  </tr>
//  <tr>
//      <td class="empty"></td>
//      <td class="fill"></td>
//      <td class="fill"></td>
//      <td class="butt"></td>
//  </tr>
//  <tr>
//      <td class="empty"></td>
//      <td class="fill"></td>
//      <td class="empty"></td>
//      <td class="empty"></td>
//  </tr>
//  <tr>
//      <td class="empty"></td>
//      <td class="fill"></td>
//      <td class="empty"></td>
//      <td class="empty"></td>
//  </tr>
//#########################################


class vratVnitrekTabulkyJedneOdbocky{

    constructor(typOdbocky){

        this.trAll = this.vratElementyTrOdbocky(typOdbocky)

    }

    getTrAll(){
        return(this.trAll);
    }


    vratElementyTrOdbocky(typOdbocky){

        var trAll = [];

        var trEl1;
        var trEl2;
        var trEl3;
        var trEl4;
        var trEl5;


        if(typOdbocky == "T"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl3 = this.vratTableRow("empty", "fill", "fill", "fill", true);
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty", false);
        }


        if(typOdbocky == "T0"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl3 = this.vratTableRow("empty", "fill", "fill", "butt", true);
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty", false);
        }


        if(typOdbocky == "L"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl3 = this.vratTableRow("empty", "fill", "fill", "fill", true);
            trEl4 = this.vratTableRow("empty", "empty", "empty", "empty", false);
            trEl5 = this.vratTableRow("empty", "empty", "empty", "empty", false);
        }


        if(typOdbocky == "L0"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl3 = this.vratTableRow("empty", "fill", "fill", "butt", true);
            trEl4 = this.vratTableRow("empty", "empty", "empty", "empty", false);
            trEl5 = this.vratTableRow("empty", "empty", "empty", "empty", false);
        }


        if(typOdbocky == "I"){
            trEl1 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl2 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl3 = this.vratTableRow("empty", "fill", "empty", "empty", true);
            trEl4 = this.vratTableRow("empty", "fill", "empty", "empty", false);
            trEl5 = this.vratTableRow("empty", "fill", "empty", "empty", false);
        }


        var trAll = [];
        trAll.push(trEl1);
        trAll.push(trEl2);
        trAll.push(trEl3);
        trAll.push(trEl4);
        trAll.push(trEl5);

        return(trAll);

    }


    vratTableRow(clName1, clName2, clName3, clName4, midle){

        var className;
        if(midle == true){
            className = "midle";
        }
        else{
            className = "tr";
        }

        var trEl = <tr className={className}>
            <td className={clName1}></td>
            <td className={clName2}></td>
            <td className={clName3}></td>
            <td className={clName4}></td>
        </tr>
   
        return(trEl);

    }

}



class vytvarejObsahHtml{

    constructor(dataSymb, jsonData){

        console.log(dataSymb);
        this.jedenRadekOdbocek = this.vratVyslednouTabulku(dataSymb, jsonData);

    }


    vratVyslednouTabulku(dataSymb, jsonData){

        var vsechnyRadkyOdbocek = this.nakresliVsechnyRadkyOdbocek(dataSymb, jsonData);
        var vyslednaTabulka =   <table>
                                    {vsechnyRadkyOdbocek}
                                </table>

        return(vyslednaTabulka);

    }



    nakresliVsechnyRadkyOdbocek(dataSymb, jsonData){

        var vsechnyRadkyOdbocek = []

        for (let i = 0; i < dataSymb.length; i++) {

            var text = jsonData.data[i].text;
            var radekSymboly = dataSymb[i];
            var jedenRadekOdbocek = this.nakresliJedenRadekOdbocek(radekSymboly, i, text);
            vsechnyRadkyOdbocek.push(jedenRadekOdbocek)

        }

        return(vsechnyRadkyOdbocek);

    }


    nakresliJedenRadekOdbocek(radekSymboly, indexRadku, text){

        var jedenRadekOdbocek;
        var elementyTd = this.vratRadekSElemntyTd(radekSymboly, indexRadku);

        jedenRadekOdbocek = <tr class="celyRadek">
                                {elementyTd}
                                <td colspan="20"class="row"> {text}

                                </td>
                            </tr>

        return(jedenRadekOdbocek)

    }

    
    vratRadekSElemntyTd(radekSymboly, indexRadku){

        var elementyTd = [];
     
     
        for (let i = 0; i < radekSymboly.length; i++) {

            var tdId = this.vratTdId(indexRadku, radekSymboly.length, i);
            var symbol = radekSymboly[i];

            var dataJedneOdbocky = new vratVnitrekTabulkyJedneOdbocky(symbol);
            var vnitrekTabulky = dataJedneOdbocky.getTrAll();
            var elementTd = this.vratElementTdSOdbockou(vnitrekTabulky, tdId);

            elementyTd.push(elementTd);
           
        }

        return(elementyTd);

    }

    //vraci id td tabulky, tj, napr. "4-1"
    vratTdId(indexTab, pocetVetvicekNaRadku, index){

        var id = pocetVetvicekNaRadku - index - 1;
        var idMinus;

        if(id == 0){
            idMinus = '';
        }
        else{
            idMinus = '-' + id;
        }
     
        var tdId = '' + indexTab + '' + idMinus + '';

        return(tdId);

    }


    vratElementTdSOdbockou(vnitrekTabulky, tdId){

        var elementTd;
        elementTd = <td class="tree" id={tdId}>
                        <table className="tableOdbocky">
                            {vnitrekTabulky}
                        </table>
                    </td>

        return(elementTd);

    }


    getData(){
        return(this.jedenRadekOdbocek);
    }


}





function TableEl(jsTree) {

    console.log(jsTree);

    var dataSymb = genTable(jsTree);
    //var vetvickyCl = new vytvorVetvickyEl(dataSymb);
    //var ElVetvicky = vetvickyCl.getElOdbocka();

    console.log(dataSymb);

    var obsahHtml = new vytvarejObsahHtml(dataSymb, jsTree);
    var dataDoHtml = obsahHtml.getData();
    


    return (
        dataDoHtml
    );

}


export default TableEl;