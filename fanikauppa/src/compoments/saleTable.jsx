function SaleRow(props) {
    return (
        <tr>
            <td>{props.data.kurssinimi}</td>
            <td>{props.data.opettaja}</td>
            <td>{props.data.luokka}</td>
        </tr>
    );
}

function SaleTable(props) {
    return (
        <div className="taulukko">
        <table>
            <thead>
                <tr>Below is the sale table with each required amount for the sale</tr>
                <tr>
                    <th>Total amount (€)</th>
                    <th>Sale Percent (%)</th>
                    <th>Range (€)</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(kurssi =>
                    <SaleRow key={kurssi.id} data={kurssi} />
                    )}
            </tbody>
        </table>
        </div>
    );
}

export {SaleRow, SaleTable}