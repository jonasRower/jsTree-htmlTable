

class ziskejTextProDanouVetev{

    constructor(objParentId, poleIndexyRadkuKliceAHodnoty, parentId){

        var parentIdStr = String(parentId);

        var prvniAPosledniRadek = this.ziskejRozmeziRadkuOdDo(poleIndexyRadkuKliceAHodnoty, parentIdStr, objParentId.length);
        this.jenPotrebnaData = this.ziskejSubDataMeziIndexyOdDo(objParentId, prvniAPosledniRadek);
        
        
        //pouzival jsem, lae uz nepouzivam
        //tato trida jen vraci text v poli a uz nic nevykresluje
        //var appendStrTable = this.vytvorAppendstr(jenPotrebnaData);

        //console.log(jenPotrebnaData);
        //console.log(prvniAPosledniRadek);

        //$("#table").append(appendStrTable);

    }


    getPotrebnaData(){
        return(this.jenPotrebnaData);
    }


    vytvorAppendstr(jenPotrebnaData){

        var appendStrTable = '<table>\n';

        for (let i = 1; i < jenPotrebnaData.length; i++) {
            var text = jenPotrebnaData[i].text;
            var radekAppendStr = this.vratRadekTabulkyAppendStr(text, 0);

            appendStrTable = appendStrTable + radekAppendStr;
        }

        appendStrTable = appendStrTable + '<table>';
        
        return(appendStrTable)

    }


    vratRadekTabulkyAppendStr(text, indSloupce){

        var radekAppendStr =    ' <tr>\n' +
                                '   <td>' + text + '</td>\n' +
                                ' </tr>\n';

        return(radekAppendStr);

    }


    ziskejSubDataMeziIndexyOdDo(objParentId, prvniAPosledniRadek){

        var jenPotrebnaData = [];

        var prvniIndex = prvniAPosledniRadek[0];
        var posledniIndex = prvniAPosledniRadek[1];

        for (let i = prvniIndex; i < posledniIndex; i++) {
            var radek = objParentId[i];
            jenPotrebnaData.push(radek);
        }

        return(jenPotrebnaData)

    }


    ziskejRozmeziRadkuOdDo(poleIndexyRadkuKliceAHodnoty, parentExp, poslInd){

        var prvniAPosledniRadek = [];

        for (let i = 0; i < poleIndexyRadkuKliceAHodnoty.length; i++) {

            var parent = poleIndexyRadkuKliceAHodnoty[i][1];
            if(parent == parentExp){

                var prvniRadek = poleIndexyRadkuKliceAHodnoty[i][0];

                if(i < poleIndexyRadkuKliceAHodnoty.length-1){
                    var posledniRadek = poleIndexyRadkuKliceAHodnoty[i+1][0];
                }
                else{
                    var posledniRadek = poslInd;
                }

                prvniAPosledniRadek.push(prvniRadek);
                prvniAPosledniRadek.push(posledniRadek);

            }

        }

        return(prvniAPosledniRadek);

    }


    

}



class ziskejJsonParentId{

    constructor(jsonData){

        //console.log(jsonData);
        //var poleId = this.ziskejPoleByKey(jsonData, "id");
        var poleParent = this.ziskejPoleByKey(jsonData, "parent");
        var poleRadkuJsonIdTextAll = this.vratJsonDataDleParent(jsonData, poleParent);
        
        var objParentId = this.prevedPoleNaObj(poleRadkuJsonIdTextAll);
        this.poleIndexyRadkuKliceAHodnoty = this.vratIndexyRadkuParent(objParentId);
        this.objParentId = objParentId;

    }


    getObjParentId(){
        return(this.objParentId);
    }

    getPoleIndexyRadkuKliceAHodnoty(){
        return(this.poleIndexyRadkuKliceAHodnoty);
    }



    prevedPoleNaObj(pole){

        var text = "[";
        var delkaPole = pole.length;

        for (let i = 0; i < delkaPole; i++) {
            var radek = pole[i];
            radek = radek.replaceAll('\\', '\\\\');
            text = text + radek

            if(i < delkaPole-1){
                text = text + ',\n';
            }
            else{
                text = text + ']'
            }
        }

        var objIdText = JSON.parse(text);

        return(objIdText)

    }


    vratIndexyRadkuParent(objParentId){

        var poleIndexyRadkuKliceAHodnoty = []

        for (let i = 0; i < objParentId.length; i++) {
            var radek = objParentId[i];
            var nazevKlice = Object.keys(radek);

            if(nazevKlice[0] == 'parent'){
                var indexHodnota = [];
                var hodnota = radek.parent;

                indexHodnota.push(i);
                indexHodnota.push(hodnota);

                poleIndexyRadkuKliceAHodnoty.push(indexHodnota);

            }

        }

        return(poleIndexyRadkuKliceAHodnoty);

    }



    vratJsonDataDleParent(jsonData, poleParent){


        var poleParentUnique = this.getUnique(poleParent);
        var poleRadkuJsonIdTextAll = [];

        for (let i = 0; i < poleParentUnique.length; i++) {

            var parent = poleParentUnique[i];
            var poleIndexuRadkuParent = this.vratIndexyRadkuPoleDleId(poleParent, parent);
            var poleIdDleIndexuRadku = this.vratPoleDleIndexuRadkuByKey(jsonData, poleIndexuRadkuParent, "id");
            var poleTextDleIndexuRadku = this.vratPoleDleIndexuRadkuByKey(jsonData, poleIndexuRadkuParent, "text");

            var poleRadkuJsonIdText = this.vytvorJsonProDanyParent(poleIdDleIndexuRadku, poleTextDleIndexuRadku, parent);
            poleRadkuJsonIdTextAll = poleRadkuJsonIdTextAll.concat(poleRadkuJsonIdText);

        }


        return(poleRadkuJsonIdTextAll);


    }


    vytvorJsonProDanyParent(poleIdDleParent, poleTextDleParent, parent){

        var poleRadkuJsonIdText = [];
        var radek0 = '{"parent": "' + parent + '"}';

        poleRadkuJsonIdText.push(radek0);

        for (let i = 0; i < poleIdDleParent.length; i++) {

            var id = poleIdDleParent[i];
            var text = poleTextDleParent[i];


            text = text.replaceAll('\'', '\\\'');
            text = text.replaceAll('\"', '\\\"');
       

            var radek = '{"id": "' + id + '", "text": "' + text + '"}';

            poleRadkuJsonIdText.push(radek);

        }

        return(poleRadkuJsonIdText);

    }


    vratPoleDleIndexuRadkuByKey(jsonData, indexyRadku, key){

        var poleHodnotDleIndexuRadku = []

        for (let i = 0; i < indexyRadku.length; i++) {
            let indexRadku = indexyRadku[i];
            let hodnota = jsonData[indexRadku][key];

            poleHodnotDleIndexuRadku.push(hodnota)
        }

        return(poleHodnotDleIndexuRadku)

    }


    vratIndexyRadkuPoleDleId(pole, idExp){

        var poleIndexuRadku = []

        for (let i = 0; i < pole.length; i++) {

            let id = pole[i];
            if(id == idExp){
                poleIndexuRadku.push(i);
            }

        }

        return(poleIndexuRadku);

    }


    ziskejPoleByKey(jsonData, key){

        var hodnota;
        var poleHodnot = [];
        
        for (let i = 0; i < jsonData.length; i++) {
            hodnota = jsonData[i][key];
            poleHodnot.push(hodnota);
        }

        return(poleHodnot);

    }


    getUnique(pole){

        let unique = pole.filter((item, i, ar) => ar.indexOf(item) === i);

        return(unique);
       
    }


}


//na zaklade objParentId je potreba aby vytvoril pole vetvicek
class createPoleVetvicekOdDo{

    constructor(objParentId, poleIndexyRadkuKliceAHodnoty){

        //console.log(objParentId);
        //console.log(poleIndexyRadkuKliceAHodnoty);

        var pocetRadku = this.vratPocetRadku(objParentId);
        var idaRodiceArr = this.vratSledRodicuProVsechnaId(objParentId, pocetRadku);
            
        var parentsStringifyArr = this.vratParentsStringifyArr(idaRodiceArr, pocetRadku);
        var idDleParentsArrAll = this.seradIdPodleParents(idaRodiceArr, parentsStringifyArr, objParentId, poleIndexyRadkuKliceAHodnoty);

        this.idDleParentsArrAll = idDleParentsArrAll;

        //console.log(idDleParentsArrAll);
    
    }


    getIdDleParentsArrAll(){
        return(this.idDleParentsArrAll);
    }


    vratPoleVetvicekOdDo(idDleParentsArrAll, pocetRadku){

        var poleVetvicekOdDo = [];

        for (let i = 0; i < idDleParentsArrAll.length; i++) {
            var radek = idDleParentsArrAll[i];
            var odDo = radek.odDo;

            if(odDo[1] == 0){
                odDo[1] = pocetRadku;
            }

            poleVetvicekOdDo.push(odDo);
        }

        return(poleVetvicekOdDo);

    }


    // seradi pole idaRodiceArr, tak aby ke stejnym (polim) parents, se priradili id
    seradIdPodleParents(idaRodiceArr, parentsStringifyArr, objParentId, poleIndexyRadkuKliceAHodnoty){

        var idDleParentsArrAll = [];
        
        for (let i = 0; i < parentsStringifyArr.length; i++) {
            var parentsStringify = parentsStringifyArr[i];
            var idDleParentsArr = this.vratVsechnaIdDleStejnehoSleduRodicu(idaRodiceArr, parentsStringify);
            var parents = JSON.parse(parentsStringify);
            var textProDanouVetev =this.ziskejTextDleParent(parents, objParentId, poleIndexyRadkuKliceAHodnoty);

            var prvniAPosledniIndex = this.ziskejPrvniAPosledniIndex(idDleParentsArr);

            var parentsId = {parents: parents, id: idDleParentsArr, odDo: prvniAPosledniIndex, text:textProDanouVetev}
            idDleParentsArrAll.push(parentsId);
        }

        return(idDleParentsArrAll);

    }


    ziskejTextDleParent(parents, objParentId, poleIndexyRadkuKliceAHodnoty){

        var parentId = parents[0];
        var textProCelouVetev = new ziskejTextProDanouVetev(objParentId, poleIndexyRadkuKliceAHodnoty, parentId);
        var textProDanouVetev = textProCelouVetev.getPotrebnaData();

        
        return(textProDanouVetev);

    }

    


    ziskejPrvniAPosledniIndex(idArr){

        var prvniIndex = idArr[0];
        var poslIndex = idArr[idArr.length-1];

        var prvniAPosledniIndex = [];
        prvniAPosledniIndex.push(prvniIndex);
        prvniAPosledniIndex.push(poslIndex);

        return(prvniAPosledniIndex);

    }



    vratVsechnaIdDleStejnehoSleduRodicu(idaRodiceArr, sledRodicuStringifyExp){

        var idDleParentsArr = []

        for (let i = 0; i < idaRodiceArr.length; i++) {
            var radek = idaRodiceArr[i];
            var sledRodicu = radek.parents;
            var sledRodicuStringify = JSON.stringify(sledRodicu);

            if(sledRodicuStringify == sledRodicuStringifyExp){
                var idDleParents = radek.id;
                idDleParentsArr.push(idDleParents);
            }
            
        }

        return(idDleParentsArr);

    }


    vratParentsStringifyArr(idaRodiceArr, pocetRadku){

        var parentsStringifyArrAll = []

        for (let i = 0; i < pocetRadku; i++) {
            var radek = idaRodiceArr[i];
            var parentsStringify = this.vratParentsStringify(radek);

            parentsStringifyArrAll.push(parentsStringify);

        }

        var parentsStringifyArrUniq = this.getUnique(parentsStringifyArrAll)
        
        return(parentsStringifyArrUniq);

    }



    vratParentsStringify(radek){

        var parents = radek.parents;
        var parentsStringify = JSON.stringify(parents);

        return(parentsStringify);

    }


    vratSledRodicuProVsechnaId(objParentId, pocetRadku){

        var idaRodiceArr = [];

        for (let i = 0; i < pocetRadku; i++) {
            var pozadovaneId = i;
            var sledRodicuId = this.vratSledRodicuId(objParentId, pozadovaneId);

            var idaRodice = {id: pozadovaneId, parents: sledRodicuId}

            idaRodiceArr.push(idaRodice);
        }  

        return(idaRodiceArr);

    }


    vratSledRodicuId(objParentId, nadrazeneId){

        var sledRodicuId = [];

        for (let i = 0; i < objParentId.length; i++) {

            var indexRadku = this.vratCisloRadkuDleId(objParentId, nadrazeneId);
            var nadrazeneId = this.vyhledejNadrazenyParent(objParentId, indexRadku);

            sledRodicuId.push(nadrazeneId);

            if(nadrazeneId == "#"){
                break;
            }
        }

        return(sledRodicuId);

    }



    vyhledejNadrazenyParent(objParentId, indRadku){

        var nadrazeneId = -1;

        for (let i = indRadku; i > -1; i--) {
            var radek = objParentId[i];
            var nazevKlice = Object.keys(radek);

            if(nazevKlice[0] == "parent"){
                var nadrazeneIdStr = radek.parent;

                if(nadrazeneIdStr != "#"){
                    nadrazeneId = parseInt(nadrazeneIdStr);
                }
                else{
                    nadrazeneId = nadrazeneIdStr;
                }
                
                break;
            }
          
        }

        return(nadrazeneId);

    }


    vratCisloRadkuDleId(objParentId, idExp){

        var indexRadku = -1;

        for (let i = 0; i < objParentId.length; i++) {
            var radek = objParentId[i];
            var id = radek.id;

            if(id == idExp){
                indexRadku = i;
                break;
            }
        }

        return(indexRadku);

    }


    //pocet radku ziska na zaklade posledniho id
    vratPocetRadku(objParentId){

        //console.log(objParentId);

        var idMax = 0;

        for (let i = 0; i < objParentId.length; i++) {
            var radek = objParentId[i];
            var id = parseInt(radek.id);

            if(id > idMax){
                idMax = id;
            }

        }

        return(idMax);

    }


    getUnique(pole){

        let unique = pole.filter((item, i, ar) => ar.indexOf(item) === i);

        return(unique);
       
    }


}


class generujPoleVetvicekSymbolicky{

    constructor(idDleParentsArrAll){

        var delkaPole = this.vratDelkuPole(idDleParentsArrAll);
        var idTextById = this.preskupIdDleParentsArrAllDlePoleSymb(delkaPole, idDleParentsArrAll);
        var poceVetviNaRadkuArr = this.vratPocetVetvicekNaRadkuArr2(idTextById);

        //console.log(poceVetviNaRadkuArr);
        //console.log(idDleParentsArrAll);
        var poleVetvicekSymbArr = this.generujPoleVetvicekSymbolicky(poceVetviNaRadkuArr);

        var poleVetvicekSymbArrT0 = this.pridejT0(poleVetvicekSymbArr);
        
        
        //console.log(poleVetvicekSymbArrT0);
        
        this.poleVetvicekSymbArr = poleVetvicekSymbArrT0;
        this.idTextById = idTextById;

    }


    getPoleVetvicekSymbArr(){
        return(this.poleVetvicekSymbArr);
    }


    getIdTextById(){
        return(this.idTextById);
    }


    //preskupi idDleParentsArrAll, tak aby souhlasil s polem poleVetvicekSymbArr
    preskupIdDleParentsArrAllDlePoleSymb(delkaPole, idDleParentsArrAll){

        var idTextById = this.vratPrazdnePole(delkaPole);
       

        for (let i = 0; i < idDleParentsArrAll.length; i++) {
            var radek = idDleParentsArrAll[i];
            var text = radek.text;
            var parents = radek.parents;
            var odDo = radek.odDo;

            idTextById = this.doplnIdDoPole(idTextById, text, parents, odDo);
            
        }

        return(idTextById);

    }


    doplnIdDoPole(idTextById, text, parents, odDo){

        for (let i = 1; i < text.length; i++) {
            var radek = text[i];
            var id = parseInt(radek.id);
            var textVal = radek.text;

            var radekZapis = {id: id, parents: parents, odDo: odDo, text: textVal}
     
            idTextById[id] = radekZapis;

        }

        return(idTextById);

    }


    vratPrazdnePole(delkaPole){

        var pole = [];

        for (let i = 0; i < delkaPole; i++) {
            var undef = undefined;
            pole.push(undef);
        }

        return(pole);

    }


    //tam kde je "T0", tam bude fungovat tlacitko na rozevirani
    pridejT0(poleVetvicekSymbArr){

        var poleVetvicekSymbArrT0 = [];

        for (let i = 0; i < poleVetvicekSymbArr.length; i++) {
            var radek = poleVetvicekSymbArr[i];
            var radekNext = poleVetvicekSymbArr[i+1];

            var delkaRadku = radek.length;
            var delkaRadkuNext;

            if(radekNext == undefined){
                delkaRadkuNext = delkaRadku;
            }
            else{
                delkaRadkuNext = radekNext.length;
            }
            
            var radekNew;

            if(delkaRadkuNext > delkaRadku){
                radekNew = this.opravSymbolT0(radek);
            }
            else{
                radekNew = radek;
            }

            poleVetvicekSymbArrT0.push(radekNew);

        }

        return(poleVetvicekSymbArrT0);

    }


    opravSymbolT0(radek){

        var radekNew = radek;
        radekNew[radekNew.length-1] = 'T0';

        return(radekNew);

    }


    generujPoleVetvicekSymbolicky(poceVetviNaRadkuArr){
        
        var poleVetvicekSymbArr = [];

        for (let i = 0; i < poceVetviNaRadkuArr.length; i++) {
            var pocetVetvicekNaRadku = poceVetviNaRadkuArr[i];
            var pocetVetvicekNaRadkuNext = poceVetviNaRadkuArr[i+1];

            if(i == poceVetviNaRadkuArr.length-1){
                pocetVetvicekNaRadkuNext = pocetVetvicekNaRadku-1;
            }
            
            var vetvickySymbRadek = this.generujVetvickySymbolickyRadek(pocetVetvicekNaRadku, pocetVetvicekNaRadkuNext);
            poleVetvicekSymbArr.push(vetvickySymbRadek);

        }

        return(poleVetvicekSymbArr)

    }


    generujVetvickySymbolickyRadek(pocetVetvicekNaRadku, pocetVetvicekNaRadkuNext){

        var vetvickySymbRadek = [];

        for (let i = 0; i < pocetVetvicekNaRadku; i++) {
            var vetvickaSymbol;

            if(i < pocetVetvicekNaRadku-1){
                vetvickaSymbol = "I";
            }
            else{
                if(pocetVetvicekNaRadkuNext < pocetVetvicekNaRadku){
                    vetvickaSymbol = "L"; 
                }
                else{
                    vetvickaSymbol = "T";
                }
            }

            vetvickySymbRadek.push(vetvickaSymbol);

        }

        return(vetvickySymbRadek);

    }


    vratPocetVetvicekNaRadkuArr(poleVetvicekOdDo){

        var maxVal = this.vratMaxValPoleVetv(poleVetvicekOdDo);
        var minVal = this.vratMinValPoleVetv(poleVetvicekOdDo, maxVal);

        //console.log(minVal);

        var poceVetviNaRadkuArr = [];

        for (let i = minVal; i < maxVal; i++) {
            var poceVetviNaRadku = this.vratPocetVetviNaRadku(poleVetvicekOdDo, i);
   
            poceVetviNaRadkuArr.push(poceVetviNaRadku);
        }

        //console.log(poceVetviNaRadkuArr);
        return(poceVetviNaRadkuArr);

    }


    vratPocetVetvicekNaRadkuArr2(idTextById){

        //console.log(idTextById);

        var pocetUrovniArr = [];

        for (let i = 0; i < idTextById.length; i++) {
            var radek = idTextById[i];
            var parents = radek.parents;

            var pocetUrovni = parents.length;
            pocetUrovniArr.push(pocetUrovni);

        }

        return(pocetUrovniArr);

    }


    vratPocetVetviNaRadku(poleVetvicekOdDo, indexRadku){

        var poceVetviNaRadku = -1;
        //console.log(poleVetvicekOdDo);
        //console.log(indexRadku);

        for (let i = 0; i < poleVetvicekOdDo.length; i++) {
            var odDo = poleVetvicekOdDo[i];
            var indJeVIntervalu = this.detekujZdaIndexJeVIntervalu(odDo, indexRadku);

            //console.log(indJeVIntervalu);

            if(indJeVIntervalu == false){
                poceVetviNaRadku = i;
                break;
            }

        }

        if(indJeVIntervalu == true){
            poceVetviNaRadku = poleVetvicekOdDo.length;
        }

        //console.log(poceVetviNaRadku);

        return(poceVetviNaRadku);
    }


    detekujZdaIndexJeVIntervalu(interval, index){

        var odVal = interval[0];
        var doVal = interval[1];

        var indexJeVIntervalu = false;

        if(index >= odVal){
            if(index <= doVal){
                indexJeVIntervalu = true
            }
        }

        return(indexJeVIntervalu);

    }


    vratMaxValPoleVetv(poleVetvicekOdDo){

        var maxVal = 0;

        for (let i = 0; i < poleVetvicekOdDo.length; i++) {
            var odDo = poleVetvicekOdDo[i];
            var doVal = odDo[1];

            if(doVal > maxVal){
                maxVal = doVal;
            }
        }

        return(maxVal);

    }


    vratMinValPoleVetv(poleVetvicekOdDo, minVal){

        for (let i = 0; i < poleVetvicekOdDo.length; i++) {
            var odDo = poleVetvicekOdDo[i];
            var odVal = odDo[0];

            if(odVal < minVal){
                minVal = odVal;
            }
        }

        return(minVal);

    }


    vratDelkuPole(idDleParentsArrAll){

        var indexDoMax = 0;

        for (let i = 0; i < idDleParentsArrAll.length; i++) {
            var radek = idDleParentsArrAll[i];
            var odDo = radek.odDo;

            var indexDo = odDo[1];

            if(indexDo > indexDoMax){
                indexDoMax = indexDo;
            }
        }

        return(indexDoMax);

    }


}



class generujPoleRadkuAppendStr{

    constructor(poleVetvicekSymbArr, idTextById){

        //console.log(poleVetvicekSymbArr);
        this.appendStrCelaTabulka = this.ziskejAppendStrProVsechnyRadky(poleVetvicekSymbArr, idTextById);

    }


    getAppendStrCelaTabulka(){
        return(this.appendStrCelaTabulka)
    }



    ziskejAppendStrProVsechnyRadky(poleVetvicekSymbArr, idTextById){

        var delkaRadkuMax = this.ziskejMaximalniPocetUrovni(poleVetvicekSymbArr);

        var appendStrCelaTabulka = [];
        appendStrCelaTabulka.push('<table cellspacing="0">');

        for (let i = 0; i < poleVetvicekSymbArr.length; i++) {
            var vetvickySymbRadek = poleVetvicekSymbArr[i];
            var idTextByIdRadek = idTextById[i];

            var appendStrSubTabCelyRadek = this.ziskejAppendStrProRadek(vetvickySymbRadek, delkaRadkuMax, idTextByIdRadek);
            appendStrCelaTabulka = appendStrCelaTabulka.concat(appendStrSubTabCelyRadek);

        }

        appendStrCelaTabulka.push('</table>');

        return(appendStrCelaTabulka);

    }


    ziskejAppendStrProRadek(vetvickySymbRadek, delkaRadkuMax, idTextByIdRadek){

        var appendStrSubTabArrAll = [];
        var delkaRadku = vetvickySymbRadek.length;
        var id = idTextByIdRadek.id;
        var text = idTextByIdRadek.text;

        appendStrSubTabArrAll.push('    <tr>');

        for (let i = 0; i < delkaRadku; i++) {
            var idTab = this.ziskejIdTab(delkaRadku, i, id);

            var typVetvicky = vetvickySymbRadek[i];
            var appendStrSubTabArr = this.ziskejSubTabulkuVetvicky(typVetvicky, idTab);
            appendStrSubTabArrAll = appendStrSubTabArrAll.concat(appendStrSubTabArr);

        }

        //console.log(idTextByIdRadek);
        var colspanStr = this.vratColspan(delkaRadkuMax, delkaRadku);

        appendStrSubTabArrAll.push('        <td ' + colspanStr + 'class="row">' + text + '</td>');
        appendStrSubTabArrAll.push('    </tr>');

        return(appendStrSubTabArrAll);

    }


    ziskejIdTab(delkaRadku, i, id){

        var idTab2 = delkaRadku - i - 1;
        if(idTab2 != 0){
            var idTab2Str = String(idTab2);
            var idTab = String(id) + '-' + idTab2Str;
        }
        else{
            var idTab = String(id)
        }
        
        return(idTab);

    }


    vratColspan(delkaRadkuMax, posledniIndex){

        var colspanInt = delkaRadkuMax - posledniIndex + 1;
        var colspanStr = 'colspan="' + colspanInt + '"'

        return(colspanStr);
    }


    ziskejSubTabulkuVetvicky(typVetvicky, idTab){

        var fillEmptyArr = this.vratFillEmptyArr(typVetvicky);
        var appendStrSubTabArr = [];
        var vlozButt;

        if(typVetvicky == "T0"){
            vlozButt = true;
        }
        else{
            vlozButt = false;
        }

        appendStrSubTabArr.push('        <td class="tree" id="' + idTab + '">');
        appendStrSubTabArr.push('            <table cellspacing="0" cellpadding="3">');
        
        for (let r = 0; r < fillEmptyArr.length; r++) {
            var fillEmptyRadek = fillEmptyArr[r];
            var poleRadkuAppendStrTr = this.ziskejTrProRadek(fillEmptyRadek, vlozButt);

            appendStrSubTabArr = appendStrSubTabArr.concat(poleRadkuAppendStrTr);
        }

        appendStrSubTabArr.push('            </table>');
        
     
        appendStrSubTabArr.push('        </td>');
        //appendStrSubTabArr.push('<td class="row">Giovanni Rovelli</td>');

        return(appendStrSubTabArr);

    }


    //vrati fillEmptyArr pro "T"
    vratFillEmptyArr(typVetvicky){

        var svisla = [];
        var vodorovna = []
        var prazdna = [];

        prazdna.push(false);
        prazdna.push(false);
        prazdna.push(false);
        prazdna.push(false);

        svisla.push(false);
        svisla.push(true);
        svisla.push(false);
        svisla.push(false);

        vodorovna.push(false);
        vodorovna.push(true);
        vodorovna.push(true);
        vodorovna.push(true);


        if(typVetvicky == "T"){
            var fillEmptyArr = [];

            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(vodorovna);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
        }


        if(typVetvicky == "T0"){
            var fillEmptyArr = [];

            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(vodorovna);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
        }

        
        if(typVetvicky == "I"){
            var fillEmptyArr = [];

            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
        }


        if(typVetvicky == "L"){
            var fillEmptyArr = [];

            fillEmptyArr.push(svisla);
            fillEmptyArr.push(svisla);
            fillEmptyArr.push(vodorovna);
            fillEmptyArr.push(prazdna);
            fillEmptyArr.push(prazdna);
        }

        return(fillEmptyArr);

    }


   

    ziskejTrProRadek(fillEmptyRadek, vlozButt){

        var poleRadkuAppendStrTr = []
        poleRadkuAppendStrTr.push('                <tr>');

        for (let i = 0; i < fillEmptyRadek.length; i++) {
            var FE;
            var radekTd;
            var fillEmpty = fillEmptyRadek[i];

            if(fillEmpty == false){
                FE = "empty";    
            }
            else{
                if(vlozButt == false){
                    FE = "fill";
                }
                else{
                    if(i == fillEmptyRadek.length-1){
                        FE = "butt";
                    }
                    else{
                        FE = "fill";
                    }
                    
                }
                
            }

            radekTd = '                    <td class="' + FE + '"></td>';
            poleRadkuAppendStrTr.push(radekTd);
        }

        poleRadkuAppendStrTr.push('                </tr>');

        return(poleRadkuAppendStrTr);

    }


    ziskejMaximalniPocetUrovni(poleVetvicekSymbArr){

        var delkaRadkuMax = 0;

        for (let i = 0; i < poleVetvicekSymbArr.length; i++) {
            var radek = poleVetvicekSymbArr[i];
            var delkaRadku = radek.length;

            if(delkaRadku > delkaRadkuMax){
                delkaRadkuMax = delkaRadku;
            }
        }

        return(delkaRadkuMax);

    }

}


class vlozAppendString{

    constructor(appendStrVetvicky){

        var appendStr = this.prevedPoleRadkuNaText(appendStrVetvicky);
        //console.log(appendStr);

        $("#table").append(appendStr);

    }


    prevedPoleRadkuNaText(appendStrVetvicky){

        var text = "";

        for (let i = 0; i < appendStrVetvicky.length; i++) {
            var radek = appendStrVetvicky[i];
            text = text + radek + '\n';
        }

        return(text);

    }

}


const main = (jsonJstree) => {

    var poleVetvicekSymbArr = [];
 
    jsonJstree = jsonJstree.data;
    if(jsonJstree != undefined){

        //ziska data jsTree
        //var jsonJstreeData = new jsTreeCl(); 
        //var jsonJstree = jsonJstreeData.getJsondata();
        //console.log(jsonJstreeString);

        //priradi jednotliva id k rodicum
        var jsonParentId = new ziskejJsonParentId(jsonJstree);
        var objParentId = jsonParentId.getObjParentId();
        var poleIndexyRadkuKliceAHodnoty = jsonParentId.getPoleIndexyRadkuKliceAHodnoty();

        //console.log(objParentId); 
        //console.log(poleIndexyRadkuKliceAHodnoty);

        //vytvori pole vetvicek od do, tak aby mohl vykreslit vetvicky
        var vetvOdDo = new createPoleVetvicekOdDo(objParentId, poleIndexyRadkuKliceAHodnoty);
        var idDleParentsArrAll = vetvOdDo.getIdDleParentsArrAll();



        //---------
        //vytvari obsah tabulky - zatim na tom nedelam, tak je to zakomentovane
        //var tabulka = new kresliTabulku(objParentId, poleIndexyRadkuKliceAHodnoty, poleVetvicekOdDo); 
        //---------   

        //vytvari pole, ktere obsahuje symbolicke odbocky - tak aby data byly testovatelna
        var vetvickySymbolicky = new generujPoleVetvicekSymbolicky(idDleParentsArrAll); 
        poleVetvicekSymbArr = vetvickySymbolicky.getPoleVetvicekSymbArr();
        //var idTextById = vetvickySymbolicky.getIdTextById();


 
        //vytvori appendString, na jehoz zaklade se vykresluje html
        //var appendStrCl = new generujPoleRadkuAppendStr(poleVetvicekSymbArr, idTextById);
        //var appendStrCelaTabulka = appendStrCl.getAppendStrCelaTabulka();
        
        //console.log(appendStrCelaTabulka);

        //vlozi appendString do Html
        //var appendRstrHtmml = new vlozAppendString(appendStrCelaTabulka);

    }

    return (poleVetvicekSymbArr);

};


export default main;