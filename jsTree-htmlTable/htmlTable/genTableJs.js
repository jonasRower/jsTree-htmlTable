
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

        console.log(objParentId);
        console.log(poleIndexyRadkuKliceAHodnoty);

        var pocetRadku = this.vratPocetRadku(objParentId);
        var idaRodiceArr = this.vratSledRodicuProVsechnaId(objParentId, pocetRadku);
            
        var parentsStringifyArr = this.vratParentsStringifyArr(idaRodiceArr, pocetRadku);
        var idDleParentsArrAll = this.seradIdPodleParents(idaRodiceArr, parentsStringifyArr, objParentId, poleIndexyRadkuKliceAHodnoty);

        this.idDleParentsArrAll = idDleParentsArrAll;

        console.log(idDleParentsArrAll);
    
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

        console.log(objParentId);

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

        console.log(poceVetviNaRadkuArr);
        console.log(idDleParentsArrAll);
        var poleVetvicekSymbArr = this.generujPoleVetvicekSymbolicky(poceVetviNaRadkuArr);

        var poleVetvicekSymbArrT0 = this.pridejT0(poleVetvicekSymbArr);
        
        
        console.log(poleVetvicekSymbArrT0);
        
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

        console.log(minVal);

        var poceVetviNaRadkuArr = [];

        for (let i = minVal; i < maxVal; i++) {
            var poceVetviNaRadku = this.vratPocetVetviNaRadku(poleVetvicekOdDo, i);
   
            poceVetviNaRadkuArr.push(poceVetviNaRadku);
        }

        console.log(poceVetviNaRadkuArr);
        return(poceVetviNaRadkuArr);

    }


    vratPocetVetvicekNaRadkuArr2(idTextById){

        console.log(idTextById);

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

        console.log(poleVetvicekSymbArr);
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
        console.log(appendStr);

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




class jsTreeCl{

    constructor(){

        this.jsondata = [
            { "id": "0", "parent": "#", "text": "public class TextReader {" },
            { "id": "1", "parent": "0", "text": "  " },
            { "id": "2", "parent": "1", "text": "    public static void main(String[] args) throws IOException {" },
            { "id": "3", "parent": "1", "text": "        " },
            { "id": "4", "parent": "1", "text": "       String adresaSlozkyABC;" },
            { "id": "5", "parent": "1", "text": "       String[] nazvySouboruABC;" },
            { "id": "6", "parent": "1", "text": "       " },
            { "id": "7", "parent": "1", "text": "       String adresaSlozkyData;" },
            { "id": "8", "parent": "1", "text": "       String nazevSouboruData;" },
            { "id": "9", "parent": "1", "text": "       " },
            { "id": "10", "parent": "1", "text": "       String adresaProjektu;" },
            { "id": "11", "parent": "1", "text": "       " },
            { "id": "12", "parent": "1", "text": "       pathOfProject cestaKProjektu = new pathOfProject();" },
            { "id": "13", "parent": "1", "text": "       adresaProjektu = cestaKProjektu.getAdresaProjektu();" },
            { "id": "14", "parent": "13", "text": "    " },
            { "id": "15", "parent": "14", "text": "    public String getAdresaProjektu(){" },
            { "id": "16", "parent": "14", "text": "        return(adresaProjektu);" },
            { "id": "17", "parent": "14", "text": "    }" },
            { "id": "18", "parent": "13", "text": "    public String getAdresaProjektu(){" },
            { "id": "19", "parent": "13", "text": "        return(adresaProjektu);" },
            { "id": "20", "parent": "13", "text": "    }" },
            { "id": "21", "parent": "1", "text": "       " },
            { "id": "22", "parent": "1", "text": "       //data pismen abecedy" },
            { "id": "23", "parent": "1", "text": "       ArrayList<ArrayList<HashMap<String, Integer>>> MapaPismenAbeceda = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "24", "parent": "1", "text": "       " },
            { "id": "25", "parent": "1", "text": "       //data pismen zkoumaneho obrazku" },
            { "id": "26", "parent": "1", "text": "       ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> MapaVsechPismenNaVsechRadcich = new ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>>();" },
            { "id": "27", "parent": "1", "text": "       " },
            { "id": "28", "parent": "1", "text": "       //data obdsahuji posouzeni vsech pismen vsech radku z obrazku vuci vsem pismenum abecedy" },
            { "id": "29", "parent": "1", "text": "       ArrayList<ArrayList<ArrayList<HashMap<String, Double>>>> posouzeniPismenePngVsechRadkuKeVsemPismenABC = new ArrayList<ArrayList<ArrayList<HashMap<String, Double>>>>();" },
            { "id": "30", "parent": "1", "text": "       " },
            { "id": "31", "parent": "1", "text": "       //obshuje pole pismen v celem obrazku - radcich + sloupcich" },
            { "id": "32", "parent": "1", "text": "       ArrayList<ArrayList<String>> pismenaVPng = new ArrayList<ArrayList<String>>();" },
            { "id": "33", "parent": "1", "text": "       " },
            { "id": "34", "parent": "1", "text": "       " },
            { "id": "35", "parent": "1", "text": "        " },
            { "id": "36", "parent": "1", "text": "       //inicializuje tridu" },
            { "id": "37", "parent": "1", "text": "       SouradniceSkupinyPismen SouradnicePismena = new SouradniceSkupinyPismen();" },
            { "id": "38", "parent": "1", "text": "       " },
            { "id": "39", "parent": "1", "text": "       //ziska vstupni data originalni pro porovnavani" },
            { "id": "40", "parent": "1", "text": "       zdrojDataAbeceda dataAbecedy = new zdrojDataAbeceda(adresaProjektu);" },
            { "id": "41", "parent": "1", "text": "       SouradnicePismena.nactiDataAbecedy(dataAbecedy.getAdresaSlozky(), dataAbecedy.getNazvySouboruPng()); " },
            { "id": "42", "parent": "41", "text": "        NazvySouboruPng[22] = 'w.png';" },
            { "id": "43", "parent": "42", "text": "    public void nactiDataAbecedy(String adresaSlozky, String[] NazvySouboruPng) throws IOException{" },
            { "id": "44", "parent": "42", "text": "        " },
            { "id": "45", "parent": "42", "text": "        String nazevZdrojPng;" },
            { "id": "46", "parent": "42", "text": "        String celaAdresaZdrojPng;" },
            { "id": "47", "parent": "42", "text": "        " },
            { "id": "48", "parent": "42", "text": "        NactiPng novyObrazek;" },
            { "id": "49", "parent": "42", "text": "        " },
            { "id": "50", "parent": "42", "text": "        ArrayList<HashMap<String, Integer>> souradniceVsechBarevObrazku;" },
            { "id": "51", "parent": "42", "text": "        ArrayList<HashMap<String, Integer>> souradniceObrazkuModifikovane = new ArrayList<HashMap<String, Integer>>();" },
            { "id": "52", "parent": "42", "text": "        " },
            { "id": "53", "parent": "42", "text": "        for (int i = 0; i < NazvySouboruPng.length; i++) {" },
            { "id": "54", "parent": "42", "text": "            nazevZdrojPng = NazvySouboruPng[i];" },
            { "id": "55", "parent": "42", "text": "            " },
            { "id": "56", "parent": "42", "text": "            celaAdresaZdrojPng = adresaSlozky + nazevZdrojPng;" },
            { "id": "57", "parent": "42", "text": "            novyObrazek = new NactiPng(adresaSlozky, nazevZdrojPng);" },
            { "id": "58", "parent": "42", "text": "            " },
            { "id": "59", "parent": "42", "text": "            //nacte data z jednoho obrazku" },
            { "id": "60", "parent": "42", "text": "            souradniceVsechBarevObrazku = novyObrazek.getSouradniceVsechBarev();" },
            { "id": "61", "parent": "42", "text": "            " },
            { "id": "62", "parent": "42", "text": "            //inicializuje tridu pro ziskani souradnic, ktere jsou pouze cerne" },
            { "id": "63", "parent": "42", "text": "            SouradniceJednohoPismene souradniceCerne = new SouradniceJednohoPismene(souradniceVsechBarevObrazku);" },
            { "id": "64", "parent": "42", "text": "            souradniceObrazkuModifikovane = souradniceCerne.getSouradnicePismeneCernobile(0, 0, 0);" },
            { "id": "65", "parent": "64", "text": "    public SouradniceJednohoPismene(ArrayList<HashMap<String, Integer>> souradniceVsechBarev){" },
            { "id": "66", "parent": "64", "text": "        " },
            { "id": "67", "parent": "64", "text": "        this.souradniceVsechBarev = souradniceVsechBarev;" },
            { "id": "68", "parent": "64", "text": "          " },
            { "id": "69", "parent": "64", "text": "    }" },
            { "id": "70", "parent": "42", "text": "            " },
            { "id": "71", "parent": "42", "text": "            //re-inicializuje tridu pro ziskani souradnic, ktere jsou vztazene k nule" },
            { "id": "72", "parent": "42", "text": "            SouradniceJednohoPismene souradniceKNule = new SouradniceJednohoPismene(souradniceObrazkuModifikovane);" },
            { "id": "73", "parent": "42", "text": "            souradniceObrazkuModifikovane = souradniceKNule.getSouradniceVztazeneKNule();" },
            { "id": "74", "parent": "73", "text": "    public SouradniceJednohoPismene(ArrayList<HashMap<String, Integer>> souradniceVsechBarev){" },
            { "id": "75", "parent": "73", "text": "        " },
            { "id": "76", "parent": "73", "text": "        this.souradniceVsechBarev = souradniceVsechBarev;" },
            { "id": "77", "parent": "73", "text": "          " },
            { "id": "78", "parent": "73", "text": "    }" },
            { "id": "79", "parent": "42", "text": "            " },
            { "id": "80", "parent": "42", "text": "            //zapise souradnice do pole" },
            { "id": "81", "parent": "42", "text": "            MapaPismenAbeceda.add(souradniceObrazkuModifikovane);" },
            { "id": "82", "parent": "42", "text": "            " },
            { "id": "83", "parent": "42", "text": "            System.out.print('');" },
            { "id": "84", "parent": "42", "text": "        }" },
            { "id": "85", "parent": "42", "text": "        " },
            { "id": "86", "parent": "42", "text": "        System.out.print('');" },
            { "id": "87", "parent": "42", "text": "        " },
            { "id": "88", "parent": "42", "text": "    }" },
            { "id": "89", "parent": "41", "text": "        NazvySouboruPng[23] = 'x.png';" },
            { "id": "90", "parent": "41", "text": "        NazvySouboruPng[24] = 'y.png';" },
            { "id": "91", "parent": "41", "text": "        NazvySouboruPng[25] = 'z.png';" },
            { "id": "92", "parent": "41", "text": "        " },
            { "id": "93", "parent": "41", "text": "    }" },
            { "id": "94", "parent": "41", "text": "    " },
            { "id": "95", "parent": "41", "text": "    public String getAdresaSlozky(){" },
            { "id": "96", "parent": "41", "text": "        " },
            { "id": "97", "parent": "41", "text": "        return (adresaSlozky);" },
            { "id": "98", "parent": "41", "text": "        " },
            { "id": "99", "parent": "41", "text": "    }" },
            { "id": "100", "parent": "41", "text": "    " },
            { "id": "101", "parent": "41", "text": "    public String[] getNazvySouboruPng(){" },
            { "id": "102", "parent": "41", "text": "        " },
            { "id": "103", "parent": "41", "text": "        return (NazvySouboruPng);" },
            { "id": "104", "parent": "41", "text": "        " },
            { "id": "105", "parent": "41", "text": "    }" },
            { "id": "106", "parent": "41", "text": "    " },
            { "id": "107", "parent": "1", "text": "       MapaPismenAbeceda = SouradnicePismena.getMapaPismenAbeceda();" },
            { "id": "108", "parent": "1", "text": "       " },
            { "id": "109", "parent": "1", "text": "       //ziska data zkoumaneho obrazku" },
            { "id": "110", "parent": "1", "text": "       zdrojDataZkoum zkoumanaData = new zdrojDataZkoum(adresaProjektu);" },
            { "id": "111", "parent": "1", "text": "       SouradnicePismena.nactiDataZkoumanehoObrazku(zkoumanaData.getAdresaSlozky(), zkoumanaData.getNazevSouboruPng());" },
            { "id": "112", "parent": "1", "text": "       MapaVsechPismenNaVsechRadcich = SouradnicePismena.getMapaVsechPismenNaVsechRadcich();" },
            { "id": "113", "parent": "112", "text": "    public void nactiDataZkoumanehoObrazku(String adresaSlozky, String NazevSouboruPng) throws IOException{" },
            { "id": "114", "parent": "112", "text": "        " },
            { "id": "115", "parent": "112", "text": "        String celaAdresaZdrojPng;" },
            { "id": "116", "parent": "112", "text": "        ArrayList<HashMap<String, Integer>> souradniceVsechBarevObrazku;" },
            { "id": "117", "parent": "112", "text": "        ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> souradniceVsechBarevVsechRadkuText;" },
            { "id": "118", "parent": "112", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> souradniceVsechBarevJednohoRadkuText;" },
            { "id": "119", "parent": "112", "text": "        " },
            { "id": "120", "parent": "112", "text": "        //celaAdresaZdrojPng = adresaSlozky + NazevSouboruPng;" },
            { "id": "121", "parent": "112", "text": "        NactiPng novyObrazek = new NactiPng(adresaSlozky, NazevSouboruPng);" },
            { "id": "122", "parent": "112", "text": "        " },
            { "id": "123", "parent": "112", "text": "        //nacte data z jednoho obrazku" },
            { "id": "124", "parent": "112", "text": "        souradniceVsechBarevObrazku = novyObrazek.getSouradniceVsechBarev();" },
            { "id": "125", "parent": "112", "text": "        " },
            { "id": "126", "parent": "112", "text": "        //mapa vsech pismen na jednom radku" },
            { "id": "127", "parent": "112", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> MapaVsechPismenNaRadku = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "128", "parent": "112", "text": "        " },
            { "id": "129", "parent": "112", "text": "        //vrati souradnice pixelu radku" },
            { "id": "130", "parent": "112", "text": "        VytvorRadkyPng pngRadky = new VytvorRadkyPng(souradniceVsechBarevObrazku);" },
            { "id": "131", "parent": "112", "text": "        " },
            { "id": "132", "parent": "131", "text": "    VytvorRadkyPng(ArrayList<HashMap<String, Integer>> souradniceVsechBarev) throws IOException{" },
            { "id": "133", "parent": "131", "text": "        " },
            { "id": "134", "parent": "131", "text": "        this.souradniceVsechBarev = souradniceVsechBarev; " },
            { "id": "135", "parent": "131", "text": "                  " },
            { "id": "136", "parent": "131", "text": "        vratYSourPrvnihoAPoslednihoPixeluRadku();" },
            { "id": "137", "parent": "131", "text": "        vytvorSouradniceVsechBarevPoRadcich();" },
            { "id": "138", "parent": "137", "text": "    //vrati pole s jednotlivimi radky" },
            { "id": "139", "parent": "137", "text": "    private void vytvorSouradniceVsechBarevPoRadcich(){" },
            { "id": "140", "parent": "137", "text": "        " },
            { "id": "141", "parent": "137", "text": "        boolean yJeNaRadku;" },
            { "id": "142", "parent": "137", "text": "        boolean yJeNaRadkuPredchozi = false;" },
            { "id": "143", "parent": "137", "text": "        " },
            { "id": "144", "parent": "137", "text": "        //obsahuje data celeho jednoho pixeloveho radku" },
            { "id": "145", "parent": "137", "text": "        ArrayList<HashMap<String, Integer>> RGBJednohoPixRadku = new ArrayList<HashMap<String, Integer>>();" },
            { "id": "146", "parent": "137", "text": "        " },
            { "id": "147", "parent": "137", "text": "        //obsahuje data celeho jednoho radku s textem (nekolik RGBJednohoRadku - ktere jsou pod sebou)" },
            { "id": "148", "parent": "137", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> souradniceVsechBarevJednohoRadkuText = null;" },
            { "id": "149", "parent": "137", "text": "        " },
            { "id": "150", "parent": "137", "text": "        " },
            { "id": "151", "parent": "137", "text": "        for (int y = 0; y < yMax; y++) {" },
            { "id": "152", "parent": "137", "text": "            " },
            { "id": "153", "parent": "137", "text": "            yJeNaRadku = detekujZdaRadekJeMeziPrvnimAPoslednimPixelemNaRadku(y);" },
            { "id": "154", "parent": "137", "text": "            " },
            { "id": "155", "parent": "137", "text": "            if(yJeNaRadku == true){" },
            { "id": "156", "parent": "137", "text": "                if(yJeNaRadkuPredchozi == false){" },
            { "id": "157", "parent": "137", "text": "                    souradniceVsechBarevJednohoRadkuText = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "158", "parent": "137", "text": "                }" },
            { "id": "159", "parent": "137", "text": "                " },
            { "id": "160", "parent": "137", "text": "                RGBJednohoPixRadku = vratRGBUrciteYSouradnice(y);" },
            { "id": "161", "parent": "137", "text": "                souradniceVsechBarevJednohoRadkuText.add(RGBJednohoPixRadku);" },
            { "id": "162", "parent": "137", "text": "            }" },
            { "id": "163", "parent": "137", "text": "            " },
            { "id": "164", "parent": "137", "text": "            if(yJeNaRadku == false){" },
            { "id": "165", "parent": "137", "text": "                if(yJeNaRadkuPredchozi == true){" },
            { "id": "166", "parent": "137", "text": "                    souradniceVsechBarevVsechRadkuText.add(souradniceVsechBarevJednohoRadkuText);" },
            { "id": "167", "parent": "137", "text": "                }" },
            { "id": "168", "parent": "137", "text": "            }" },
            { "id": "169", "parent": "137", "text": "            " },
            { "id": "170", "parent": "137", "text": "            yJeNaRadkuPredchozi = yJeNaRadku;" },
            { "id": "171", "parent": "137", "text": "            " },
            { "id": "172", "parent": "137", "text": "        }" },
            { "id": "173", "parent": "137", "text": "        " },
            { "id": "174", "parent": "137", "text": "        " },
            { "id": "175", "parent": "137", "text": "        " },
            { "id": "176", "parent": "137", "text": "    }" },
            { "id": "177", "parent": "131", "text": "        " },
            { "id": "178", "parent": "131", "text": "        " },
            { "id": "179", "parent": "131", "text": "        System.out.print('');" },
            { "id": "180", "parent": "131", "text": "        " },
            { "id": "181", "parent": "131", "text": "    }" },
            { "id": "182", "parent": "112", "text": "        //Trida s daty s pismeny na jednom radku" },
            { "id": "183", "parent": "112", "text": "        RozdelRadekNaPismena PismenaNaRadku;" },
            { "id": "184", "parent": "112", "text": "        " },
            { "id": "185", "parent": "112", "text": "        " },
            { "id": "186", "parent": "112", "text": "        //---------------- Data rozdelena na jednotlive radky --------------------------------" },
            { "id": "187", "parent": "112", "text": "        //" },
            { "id": "188", "parent": "112", "text": "        //souradnice barev rozdelena na radky" },
            { "id": "189", "parent": "112", "text": "        souradniceVsechBarevVsechRadkuText = pngRadky.getSouradniceVsechBarevVsechRadkuText();" },
            { "id": "190", "parent": "112", "text": "        " },
            { "id": "191", "parent": "112", "text": "        " },
            { "id": "192", "parent": "112", "text": "        //data na jednotlivych radcich" },
            { "id": "193", "parent": "112", "text": "        for (int i = 0; i < souradniceVsechBarevVsechRadkuText.size(); i++) {" },
            { "id": "194", "parent": "112", "text": "            " },
            { "id": "195", "parent": "112", "text": "            souradniceVsechBarevJednohoRadkuText = souradniceVsechBarevVsechRadkuText.get(i);" },
            { "id": "196", "parent": "112", "text": "            " },
            { "id": "197", "parent": "112", "text": "            //Po jednotlivych radcich rozdeli data na jednotliva pismena" },
            { "id": "198", "parent": "112", "text": "            //Inicializuje tridu v kazdem cyklu zvlast" },
            { "id": "199", "parent": "112", "text": "            PismenaNaRadku = new RozdelRadekNaPismena(souradniceVsechBarevJednohoRadkuText);" },
            { "id": "200", "parent": "112", "text": "            MapaVsechPismenNaRadku = PismenaNaRadku.getMapaVsechPismenNaRadku(); " },
            { "id": "201", "parent": "112", "text": "        " },
            { "id": "202", "parent": "112", "text": "            //prida data z jednoho radku do vsech radku" },
            { "id": "203", "parent": "112", "text": "            MapaVsechPismenNaVsechRadcich.add(MapaVsechPismenNaRadku);" },
            { "id": "204", "parent": "112", "text": "            System.out.print('');" },
            { "id": "205", "parent": "112", "text": "                    " },
            { "id": "206", "parent": "112", "text": "        } " },
            { "id": "207", "parent": "112", "text": "        " },
            { "id": "208", "parent": "112", "text": "        //redukuje data vsech pismen" },
            { "id": "209", "parent": "112", "text": "        redukujDataMapyVsechPismen();" },
            { "id": "210", "parent": "112", "text": "        " },
            { "id": "211", "parent": "210", "text": "    //redukuje data, s tim, ze vrati pouze souradnice RGB s cernou barvou a vztazene k nule" },
            { "id": "212", "parent": "210", "text": "    private void redukujDataMapyVsechPismen() throws IOException{" },
            { "id": "213", "parent": "210", "text": "        " },
            { "id": "214", "parent": "210", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> MapaVsechPismenNaRadku = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "215", "parent": "210", "text": "        ArrayList<HashMap<String, Integer>> MapaPismene = new ArrayList<HashMap<String, Integer>>(); " },
            { "id": "216", "parent": "210", "text": "        " },
            { "id": "217", "parent": "210", "text": "        ArrayList<HashMap<String, Integer>> MapaPismeneModifikovane = new ArrayList<HashMap<String, Integer>>(); " },
            { "id": "218", "parent": "210", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> MapaVsechPismenNaRadkuModifikovane = null;" },
            { "id": "219", "parent": "210", "text": "        ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> MapaVsechPismenNaVsechRadcichModifikovane = new ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>>();" },
            { "id": "220", "parent": "210", "text": "        " },
            { "id": "221", "parent": "210", "text": "        for (int r = 0; r < MapaVsechPismenNaVsechRadcich.size(); r++) {" },
            { "id": "222", "parent": "210", "text": "            MapaVsechPismenNaRadku = MapaVsechPismenNaVsechRadcich.get(r);" },
            { "id": "223", "parent": "210", "text": "            MapaVsechPismenNaRadkuModifikovane = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "224", "parent": "210", "text": "            " },
            { "id": "225", "parent": "210", "text": "            for (int s = 0; s < MapaVsechPismenNaRadku.size(); s++) {" },
            { "id": "226", "parent": "210", "text": "                MapaPismene = MapaVsechPismenNaRadku.get(s);" },
            { "id": "227", "parent": "210", "text": "                " },
            { "id": "228", "parent": "210", "text": "                //MapaPismeneModifikovane = MapaPismene;" },
            { "id": "229", "parent": "210", "text": "                " },
            { "id": "230", "parent": "210", "text": "                //inicializuje tridu pro ziskani souradnic, ktere jsou pouze cerne" },
            { "id": "231", "parent": "210", "text": "                SouradniceJednohoPismene souradniceCerne = new SouradniceJednohoPismene(MapaPismene);" },
            { "id": "232", "parent": "210", "text": "                MapaPismeneModifikovane = souradniceCerne.getSouradnicePismeneCernobile(0, 0, 0);" },
            { "id": "233", "parent": "210", "text": "            " },
            { "id": "234", "parent": "210", "text": "                //re-inicializuje tridu pro ziskani souradnic, ktere jsou vztazene k nule" },
            { "id": "235", "parent": "210", "text": "                SouradniceJednohoPismene souradniceKNule = new SouradniceJednohoPismene(MapaPismeneModifikovane);" },
            { "id": "236", "parent": "210", "text": "                MapaPismeneModifikovane = souradniceKNule.getSouradniceVztazeneKNule();" },
            { "id": "237", "parent": "210", "text": "                " },
            { "id": "238", "parent": "210", "text": "                " },
            { "id": "239", "parent": "210", "text": "                " },
            { "id": "240", "parent": "210", "text": "                //zpetne posklada data" },
            { "id": "241", "parent": "210", "text": "                MapaVsechPismenNaRadkuModifikovane.add(MapaPismeneModifikovane);" },
            { "id": "242", "parent": "210", "text": "                " },
            { "id": "243", "parent": "210", "text": "                //Testuje data" },
            { "id": "244", "parent": "210", "text": "                //TestData test = new TestData(MapaPismeneModifikovane);" },
            { "id": "245", "parent": "210", "text": "                //test.TiskDoPng();" },
            { "id": "246", "parent": "210", "text": "                " },
            { "id": "247", "parent": "210", "text": "                " },
            { "id": "248", "parent": "210", "text": "                System.out.println();" },
            { "id": "249", "parent": "210", "text": "                " },
            { "id": "250", "parent": "210", "text": "            }" },
            { "id": "251", "parent": "210", "text": "            " },
            { "id": "252", "parent": "210", "text": "            MapaVsechPismenNaVsechRadcichModifikovane.add(MapaVsechPismenNaRadkuModifikovane);" },
            { "id": "253", "parent": "210", "text": "            System.out.println();" },
            { "id": "254", "parent": "210", "text": "            " },
            { "id": "255", "parent": "210", "text": "        }" },
            { "id": "256", "parent": "210", "text": "        " },
            { "id": "257", "parent": "210", "text": "        MapaVsechPismenNaVsechRadcich = MapaVsechPismenNaVsechRadcichModifikovane; " },
            { "id": "258", "parent": "210", "text": "" },
            { "id": "259", "parent": "210", "text": "    }" },
            { "id": "260", "parent": "112", "text": "        System.out.print('');" },
            { "id": "261", "parent": "112", "text": "        " },
            { "id": "262", "parent": "112", "text": "    }" },
            { "id": "263", "parent": "1", "text": "       " },
            { "id": "264", "parent": "1", "text": "       ///////////////////////////////////////////////////////" },
            { "id": "265", "parent": "1", "text": "       //tiskne data do logu" },
            { "id": "266", "parent": "1", "text": "       convertArrayList csvOutput = new convertArrayList(MapaVsechPismenNaVsechRadcich, 'mainResult2.txt');" },
            { "id": "267", "parent": "1", "text": "       ///////////////////////////////////////////////////////" },
            { "id": "268", "parent": "267", "text": "    public convertArrayList(ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> data, String nazevTxt){" },
            { "id": "269", "parent": "267", "text": "        " },
            { "id": "270", "parent": "267", "text": "        this.nazevTxt = nazevTxt;" },
            { "id": "271", "parent": "267", "text": "                " },
            { "id": "272", "parent": "267", "text": "        tiskniListArrayListArrayListHashMap(data);" },
            { "id": "273", "parent": "267", "text": "        dataForTree vytvorDataProStrom = new dataForTree(poleRadku);" },
            { "id": "274", "parent": "273", "text": "    " },
            { "id": "275", "parent": "274", "text": "    public dataForTree(ArrayList<String> poleRadku){" },
            { "id": "276", "parent": "274", "text": "        " },
            { "id": "277", "parent": "274", "text": "        int poleOdsazeni[];" },
            { "id": "278", "parent": "274", "text": "        String poleStromuRadku[];" },
            { "id": "279", "parent": "274", "text": "        " },
            { "id": "280", "parent": "274", "text": "        int[][] poleVsechIndexuRadku;" },
            { "id": "281", "parent": "274", "text": "        int[][] startEndPole;" },
            { "id": "282", "parent": "274", "text": "        " },
            { "id": "283", "parent": "274", "text": "        poleOdsazeni = ziskejPoleOdsazeni(poleRadku);" },
            { "id": "284", "parent": "274", "text": "        indexPosledniUrovne = vratMaxItem(poleOdsazeni); " },
            { "id": "285", "parent": "284", "text": "    //vrati maximalni polozku pole" },
            { "id": "286", "parent": "284", "text": "    private int vratMaxItem(int[] array){" },
            { "id": "287", "parent": "284", "text": "        " },
            { "id": "288", "parent": "284", "text": "        int item;" },
            { "id": "289", "parent": "284", "text": "        int itemMax;" },
            { "id": "290", "parent": "284", "text": "        " },
            { "id": "291", "parent": "284", "text": "        itemMax = 0;" },
            { "id": "292", "parent": "284", "text": "        " },
            { "id": "293", "parent": "284", "text": "        for (int i = 1; i < array.length; i++) {" },
            { "id": "294", "parent": "284", "text": "            " },
            { "id": "295", "parent": "284", "text": "            item = array[i];" },
            { "id": "296", "parent": "284", "text": "            if(item > itemMax){" },
            { "id": "297", "parent": "284", "text": "                itemMax = item;" },
            { "id": "298", "parent": "284", "text": "            }" },
            { "id": "299", "parent": "284", "text": "            " },
            { "id": "300", "parent": "284", "text": "        }" },
            { "id": "301", "parent": "284", "text": "        " },
            { "id": "302", "parent": "284", "text": "        return(itemMax);" },
            { "id": "303", "parent": "284", "text": "    }" },
            { "id": "304", "parent": "274", "text": "        " },
            { "id": "305", "parent": "274", "text": "        poleVsechIndexuRadku = vratPoleVsechIndexuRadku(poleOdsazeni);" },
            { "id": "306", "parent": "274", "text": "        startEndPole = vratStartEndPolePosledniUrovne(poleVsechIndexuRadku);" },
            { "id": "307", "parent": "306", "text": "    " },
            { "id": "308", "parent": "307", "text": "    " },
            { "id": "309", "parent": "307", "text": "    private int[][] vratCestuStartEnd(int[][] startEndPole, int[][] poleVsechIndexuRadku){" },
            { "id": "310", "parent": "307", "text": "        " },
            { "id": "311", "parent": "307", "text": "        int[] dataZakladniUrovne = poleVsechIndexuRadku[0];" },
            { "id": "312", "parent": "307", "text": "        int[][] pathStartEndPole = new int[startEndPole.length][3];" },
            { "id": "313", "parent": "307", "text": "        int itemStart;" },
            { "id": "314", "parent": "307", "text": "        int itemPrev;" },
            { "id": "315", "parent": "307", "text": "        int itemEnd;" },
            { "id": "316", "parent": "307", "text": "        " },
            { "id": "317", "parent": "307", "text": "        for (int i = 0; i < startEndPole.length; i++){" },
            { "id": "318", "parent": "307", "text": "            itemStart = startEndPole[i][0];" },
            { "id": "319", "parent": "307", "text": "            " },
            { "id": "320", "parent": "307", "text": "            if(itemStart > -1){" },
            { "id": "321", "parent": "307", "text": "                itemPrev = vratDataNejblizsihoNizsihoIndexu(dataZakladniUrovne, itemStart);" },
            { "id": "322", "parent": "307", "text": "                itemEnd = startEndPole[i][1];" },
            { "id": "323", "parent": "307", "text": "            }" },
            { "id": "324", "parent": "307", "text": "            else{" },
            { "id": "325", "parent": "307", "text": "                itemStart = -1;" },
            { "id": "326", "parent": "307", "text": "                itemPrev = -1;" },
            { "id": "327", "parent": "307", "text": "                itemEnd = -1;" },
            { "id": "328", "parent": "307", "text": "            }" },
            { "id": "329", "parent": "307", "text": "            " },
            { "id": "330", "parent": "307", "text": "            pathStartEndPole[i][0] = itemPrev;" },
            { "id": "331", "parent": "307", "text": "            pathStartEndPole[i][1] = itemStart;" },
            { "id": "332", "parent": "307", "text": "            pathStartEndPole[i][2] = itemEnd;" },
            { "id": "333", "parent": "307", "text": "            " },
            { "id": "334", "parent": "307", "text": "        }" },
            { "id": "335", "parent": "307", "text": "        " },
            { "id": "336", "parent": "307", "text": "        return(pathStartEndPole);" },
            { "id": "337", "parent": "307", "text": "        " },
            { "id": "338", "parent": "307", "text": "        " },
            { "id": "339", "parent": "307", "text": "    }" },
            { "id": "340", "parent": "306", "text": "    private int[][] vratStartEndPolePosledniUrovne(int[][] poleVsechIndexuRadku){" },
            { "id": "341", "parent": "306", "text": "    " },
            { "id": "342", "parent": "306", "text": "        int[] dataPredposledniUrovne = poleVsechIndexuRadku[indexPosledniUrovne-1];" },
            { "id": "343", "parent": "306", "text": "        int delkaPredposledniUrovne = dataPredposledniUrovne.length;" },
            { "id": "344", "parent": "306", "text": "        int[] koncoveIndexyPosledniUrovne;" },
            { "id": "345", "parent": "306", "text": "        " },
            { "id": "346", "parent": "306", "text": "        koncoveIndexyPosledniUrovne = vratPoleKoncovychIndexuPosledniUrovne(delkaPredposledniUrovne, poleVsechIndexuRadku);" },
            { "id": "347", "parent": "306", "text": "        " },
            { "id": "348", "parent": "306", "text": "        int[][] startEndPole = new int[koncoveIndexyPosledniUrovne.length][2];" },
            { "id": "349", "parent": "306", "text": "        int indexStart;" },
            { "id": "350", "parent": "306", "text": "        int indexEnd;" },
            { "id": "351", "parent": "306", "text": "        " },
            { "id": "352", "parent": "306", "text": "        for (int i = 0; i < koncoveIndexyPosledniUrovne.length; i++){" },
            { "id": "353", "parent": "306", "text": "            indexEnd = koncoveIndexyPosledniUrovne[i];" },
            { "id": "354", "parent": "306", "text": "            indexStart = vratIndexStart(dataPredposledniUrovne, indexEnd);" },
            { "id": "355", "parent": "306", "text": "            " },
            { "id": "356", "parent": "306", "text": "            startEndPole[i][0] = indexStart;" },
            { "id": "357", "parent": "306", "text": "            startEndPole[i][1] = indexEnd;" },
            { "id": "358", "parent": "306", "text": "        }" },
            { "id": "359", "parent": "306", "text": "        " },
            { "id": "360", "parent": "306", "text": "        return(startEndPole);" },
            { "id": "361", "parent": "306", "text": "        " },
            { "id": "362", "parent": "306", "text": "    }" },
            { "id": "363", "parent": "274", "text": "        pathStartEndPole = vratCestuStartEnd(startEndPole, poleVsechIndexuRadku);" },
            { "id": "364", "parent": "274", "text": "        " },
            { "id": "365", "parent": "274", "text": "        " },
            { "id": "366", "parent": "274", "text": "        " },
            { "id": "367", "parent": "274", "text": "        " },
            { "id": "368", "parent": "274", "text": "    }" },
            { "id": "369", "parent": "273", "text": "    ArrayList<String> poleRadku = new ArrayList<>();" },
            { "id": "370", "parent": "273", "text": "    String nazevTxt;" },
            { "id": "371", "parent": "273", "text": "    " },
            { "id": "372", "parent": "273", "text": "    public convertArrayList(ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> data, String nazevTxt){" },
            { "id": "373", "parent": "273", "text": "        " },
            { "id": "374", "parent": "273", "text": "        this.nazevTxt = nazevTxt;" },
            { "id": "375", "parent": "273", "text": "                " },
            { "id": "376", "parent": "273", "text": "        tiskniListArrayListArrayListHashMap(data);" },
            { "id": "377", "parent": "273", "text": "        dataForTree vytvorDataProStrom = new dataForTree(poleRadku);" },
            { "id": "378", "parent": "273", "text": "" },
            { "id": "379", "parent": "273", "text": "        int[][] pathStartEndPole = vytvorDataProStrom.getPathStartEndPole();" },
            { "id": "380", "parent": "273", "text": "        String[] vetveLog;" },
            { "id": "381", "parent": "273", "text": "        String[] spojenaData;" },
            { "id": "382", "parent": "273", "text": "        " },
            { "id": "383", "parent": "273", "text": "        //tiskne log do txt" },
            { "id": "384", "parent": "273", "text": "        kresliVetve vetveVLogu = new kresliVetve(pathStartEndPole);" },
            { "id": "385", "parent": "273", "text": "        vetveLog = vetveVLogu.getVratVetve();" },
            { "id": "386", "parent": "273", "text": "        " },
            { "id": "387", "parent": "273", "text": "        logData ziskejKompletniLog = new logData(vetveLog, poleRadku);" },
            { "id": "388", "parent": "267", "text": "" },
            { "id": "389", "parent": "267", "text": "        int[][] pathStartEndPole = vytvorDataProStrom.getPathStartEndPole();" },
            { "id": "390", "parent": "267", "text": "        String[] vetveLog;" },
            { "id": "391", "parent": "390", "text": "    public int[][] getPathStartEndPole(){" },
            { "id": "392", "parent": "390", "text": "        return(pathStartEndPole);" },
            { "id": "393", "parent": "390", "text": "    }" },
            { "id": "394", "parent": "267", "text": "        String[] spojenaData;" },
            { "id": "395", "parent": "267", "text": "        " },
            { "id": "396", "parent": "267", "text": "        //tiskne log do txt" },
            { "id": "397", "parent": "267", "text": "        kresliVetve vetveVLogu = new kresliVetve(pathStartEndPole);" },
            { "id": "398", "parent": "267", "text": "        vetveLog = vetveVLogu.getVratVetve();" },
            { "id": "399", "parent": "398", "text": "    " },
            { "id": "400", "parent": "399", "text": "    public String[] getVratVetve(){" },
            { "id": "401", "parent": "399", "text": "        return(dataVetveTotNul);" },
            { "id": "402", "parent": "399", "text": "    }" },
            { "id": "403", "parent": "398", "text": "    public String[] getVratVetve(){" },
            { "id": "404", "parent": "398", "text": "        return(dataVetveTotNul);" },
            { "id": "405", "parent": "398", "text": "    }" },
            { "id": "406", "parent": "267", "text": "        " },
            { "id": "407", "parent": "267", "text": "        logData ziskejKompletniLog = new logData(vetveLog, poleRadku);" },
            { "id": "408", "parent": "267", "text": "        spojenaData = ziskejKompletniLog.getSpojenaData();" },
            { "id": "409", "parent": "408", "text": "    " },
            { "id": "410", "parent": "409", "text": "    public String[] getSpojenaData(){" },
            { "id": "411", "parent": "409", "text": "        return(spojenaData);" },
            { "id": "412", "parent": "409", "text": "    }" },
            { "id": "413", "parent": "408", "text": "    public String[] getSpojenaData(){" },
            { "id": "414", "parent": "408", "text": "        return(spojenaData);" },
            { "id": "415", "parent": "408", "text": "    }" },
            { "id": "416", "parent": "267", "text": "        " },
            { "id": "417", "parent": "267", "text": "        //vytiskne data do logu" },
            { "id": "418", "parent": "267", "text": "        tiskniDoLoguArr(spojenaData);" },
            { "id": "419", "parent": "267", "text": "         " },
            { "id": "420", "parent": "419", "text": "    " },
            { "id": "421", "parent": "419", "text": "    private void tiskniDoLoguArr(String[] poleStromuRadku){" },
            { "id": "422", "parent": "419", "text": "        " },
            { "id": "423", "parent": "419", "text": "        String text;" },
            { "id": "424", "parent": "419", "text": "        String adresaProjektu;" },
            { "id": "425", "parent": "419", "text": "        String adresaProjektuLog;" },
            { "id": "426", "parent": "419", "text": "        text = prevedArrNaText(poleStromuRadku);" },
            { "id": "427", "parent": "419", "text": "        " },
            { "id": "428", "parent": "419", "text": "        pathOfProject cestaKProjektu = new pathOfProject();" },
            { "id": "429", "parent": "419", "text": "        adresaProjektu = cestaKProjektu.getAdresaProjektu();" },
            { "id": "430", "parent": "419", "text": "        adresaProjektuLog = adresaProjektu + '\\InputOutput\\treeVariables\\' + nazevTxt;" },
            { "id": "431", "parent": "419", "text": "        " },
            { "id": "432", "parent": "419", "text": "        " },
            { "id": "433", "parent": "431", "text": "        try {" },
            { "id": "434", "parent": "431", "text": "                FileWriter myWriter = new FileWriter(adresaProjektuLog);" },
            { "id": "435", "parent": "431", "text": "                myWriter.write(text);" },
            { "id": "436", "parent": "431", "text": "                myWriter.close();" },
            { "id": "437", "parent": "431", "text": "                System.out.println('Successfully wrote to the file.');" },
            { "id": "438", "parent": "431", "text": "                " },
            { "id": "439", "parent": "437", "text": "            } catch (IOException e) {" },
            { "id": "440", "parent": "437", "text": "                System.out.println('An error occurred.');" },
            { "id": "441", "parent": "437", "text": "                e.printStackTrace();" },
            { "id": "442", "parent": "419", "text": "          }" },
            { "id": "443", "parent": "267", "text": "    }" },
            { "id": "444", "parent": "1", "text": "       " },
            { "id": "445", "parent": "1", "text": "       " },
            { "id": "446", "parent": "1", "text": "       //porovnavaData" },
            { "id": "447", "parent": "1", "text": "       PosouzeniSouradnic posouzeni = new PosouzeniSouradnic(MapaPismenAbeceda, MapaVsechPismenNaVsechRadcich);" },
            { "id": "448", "parent": "1", "text": "       posouzeniPismenePngVsechRadkuKeVsemPismenABC = posouzeni.getPosouzeni();" },
            { "id": "449", "parent": "448", "text": "    public PosouzeniSouradnic(ArrayList<ArrayList<HashMap<String, Integer>>> MapaPismenAbeceda, ArrayList<ArrayList<ArrayList<HashMap<String, Integer>>>> MapaVsechPismenNaVsechRadcich){" },
            { "id": "450", "parent": "448", "text": "        " },
            { "id": "451", "parent": "448", "text": "        this.MapaPismenAbeceda = MapaPismenAbeceda;" },
            { "id": "452", "parent": "448", "text": "        this.MapaVsechPismenNaVsechRadcich = MapaVsechPismenNaVsechRadcich;" },
            { "id": "453", "parent": "448", "text": "        " },
            { "id": "454", "parent": "448", "text": "        //zatim provizorne ziskavam data jakozto dilci mapy pismenek, ktere budou porovnavat" },
            { "id": "455", "parent": "448", "text": "        ArrayList<ArrayList<HashMap<String, Integer>>> MapaVsechPismenNaJednomRadku = new ArrayList<ArrayList<HashMap<String, Integer>>>();" },
            { "id": "456", "parent": "448", "text": "        ArrayList<HashMap<String, Integer>> MapaPismeneZVybranehoSloupce = new ArrayList<HashMap<String, Integer>>();" },
            { "id": "457", "parent": "448", "text": "        " },
            { "id": "458", "parent": "448", "text": "        //data obdsahuji posouzeni jednoho pismene z obrazku vuci vsem pismenum abecedy, ten s nejmensi odchylkaSqrt vyhrava" },
            { "id": "459", "parent": "448", "text": "        ArrayList<HashMap<String, Double>> posouzeniJednohoPismenePngKeVsemPismenumABC = new ArrayList<HashMap<String, Double>>();" },
            { "id": "460", "parent": "448", "text": "        " },
            { "id": "461", "parent": "448", "text": "        ArrayList<ArrayList<HashMap<String, Double>>> posouzeniVsechPismenPngKeVsemPismenumABC = new ArrayList<ArrayList<HashMap<String, Double>>>();" },
            { "id": "462", "parent": "448", "text": "        " },
            { "id": "463", "parent": "448", "text": "        //data obdsahuji posouzeni vsech pismen jednoho radku z obrazku vuci vsem pismenum abecedy" },
            { "id": "464", "parent": "448", "text": "        ArrayList<ArrayList<ArrayList<HashMap<String, Double>>>> posouzeniPismenePngJednohoRadkuKeVsemPismenABC = null;" },
            { "id": "465", "parent": "448", "text": "        " },
            { "id": "466", "parent": "448", "text": "        for (int r = 0; r < MapaVsechPismenNaVsechRadcich.size(); r++) {" },
            { "id": "467", "parent": "448", "text": "            MapaVsechPismenNaJednomRadku = MapaVsechPismenNaVsechRadcich.get(r);" },
            { "id": "468", "parent": "448", "text": "            posouzeniVsechPismenPngKeVsemPismenumABC = new ArrayList<ArrayList<HashMap<String, Double>>>();" },
            { "id": "469", "parent": "448", "text": "            " },
            { "id": "470", "parent": "448", "text": "            for (int s = 0; s < MapaVsechPismenNaJednomRadku.size(); s++) {" },
            { "id": "471", "parent": "448", "text": "                MapaPismeneZVybranehoSloupce = MapaVsechPismenNaJednomRadku.get(s);" },
            { "id": "472", "parent": "448", "text": "        " },
            { "id": "473", "parent": "448", "text": "                posouzeniJednohoPismenePngKeVsemPismenumABC = (provedPosouzeniProVsechnaPismenaAbecedy(MapaPismeneZVybranehoSloupce, MapaPismenAbeceda));" },
            { "id": "474", "parent": "448", "text": "                posouzeniVsechPismenPngKeVsemPismenumABC.add(posouzeniJednohoPismenePngKeVsemPismenumABC);" },
            { "id": "475", "parent": "448", "text": "                System.out.print('');" },
            { "id": "476", "parent": "448", "text": "            } " },
            { "id": "477", "parent": "448", "text": "            " },
            { "id": "478", "parent": "448", "text": "            posouzeniPismenePngVsechRadkuKeVsemPismenABC.add(posouzeniVsechPismenPngKeVsemPismenumABC);" },
            { "id": "479", "parent": "448", "text": "        }    " },
            { "id": "480", "parent": "448", "text": "        " },
            { "id": "481", "parent": "448", "text": "        //posouzeniPismenePngVsechRadkuKeVsemPismenABC.add(posouzeniPismenePngJednohoRadkuKeVsemPismenABC);" },
            { "id": "482", "parent": "448", "text": "        System.out.print('');" },
            { "id": "483", "parent": "448", "text": "    }" },
            { "id": "484", "parent": "1", "text": "       " },
            { "id": "485", "parent": "1", "text": "       PorovnaniSouradnic porovnani = new PorovnaniSouradnic(posouzeniPismenePngVsechRadkuKeVsemPismenABC, adresaProjektu);" },
            { "id": "486", "parent": "1", "text": "       pismenaVPng = porovnani.getPismenaVPng();" },
            { "id": "487", "parent": "1", "text": "       System.out.print('');" },
            { "id": "488", "parent": "1", "text": "       " },
            { "id": "489", "parent": "1", "text": "       " },
            { "id": "490", "parent": "1", "text": "       createOutput vytvorVystup = new createOutput(pismenaVPng, adresaProjektu, '\\InputOutput\\outputs\\output.csv');" },
            { "id": "491", "parent": "1", "text": "       " },
            { "id": "492", "parent": "1", "text": "       " },
            { "id": "493", "parent": "1", "text": "       //testuje data - zakom./odkomentovat jeden nebo druhy radek, podle toho, co chci tisknout" },
            { "id": "494", "parent": "1", "text": "       //TestData test = new TestData(MapaPismenAbeceda, 0);" },
            { "id": "495", "parent": "1", "text": "       //TestData test = new TestData(MapaVsechPismenNaVsechRadcich, 0, 0);" },
            { "id": "496", "parent": "1", "text": "       " },
            { "id": "497", "parent": "1", "text": "       //test.TiskDoPng();" },
            { "id": "498", "parent": "1", "text": "        " },
            { "id": "499", "parent": "0", "text": "    }" },
            { "id": "500", "parent": "0", "text": "    " },
        ];
    }

    getJsondata(){
        return(this.jsondata)
    } 
}



$(document).ready(function(){

    //ziska data jsTree
    var jsonJstreeData = new jsTreeCl(); 
    var jsonJstree = jsonJstreeData.getJsondata();

    //priradi jednotliva id k rodicum
    var jsonParentId = new ziskejJsonParentId(jsonJstree);
    var objParentId = jsonParentId.getObjParentId();
    var poleIndexyRadkuKliceAHodnoty = jsonParentId.getPoleIndexyRadkuKliceAHodnoty();

    console.log(objParentId); 
    console.log(poleIndexyRadkuKliceAHodnoty);

    //vytvori pole vetvicek od do, tak aby mohl vykreslit vetvicky
    var vetvOdDo = new createPoleVetvicekOdDo(objParentId, poleIndexyRadkuKliceAHodnoty);
    var idDleParentsArrAll = vetvOdDo.getIdDleParentsArrAll();

    //---------
    //vytvari obsah tabulky - zatim na tom nedelam, tak je to zakomentovane
    //var tabulka = new kresliTabulku(objParentId, poleIndexyRadkuKliceAHodnoty, poleVetvicekOdDo); 
    //---------   

    //vytvari pole, ktere obsahuje symbolicke odbocky - tak aby data byly testovatelna
    var vetvickySymbolicky = new generujPoleVetvicekSymbolicky(idDleParentsArrAll); 
    var poleVetvicekSymbArr = vetvickySymbolicky.getPoleVetvicekSymbArr();
    var idTextById = vetvickySymbolicky.getIdTextById();

    //console.log(poleVetvicekOdDo);
    console.log(poleVetvicekSymbArr);
    console.log(idTextById);

    //vytvori appendString, na jehoz zaklade se vykresluje html
    var appendStrCl = new generujPoleRadkuAppendStr(poleVetvicekSymbArr, idTextById);
    var appendStrCelaTabulka = appendStrCl.getAppendStrCelaTabulka();
    
    //console.log(appendStrCelaTabulka);

    //vlozi appendString do Html
    var appendRstrHtmml = new vlozAppendString(appendStrCelaTabulka);

});