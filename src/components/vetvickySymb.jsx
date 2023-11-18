/*
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


function TableEl() {

    return (
        vratCells()
    );

}


export default TableEl;
*/