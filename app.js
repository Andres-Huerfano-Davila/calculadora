function limpiarNumero(valor) {
    return valor.replace(/\./g, "").replace(/,/g, "").replace("%", "").trim();
}

function formatearMonto(input) {
    let valor = limpiarNumero(input.value);

    if (valor === "" || isNaN(valor)) {
        input.value = "";
        return;
    }

    input.value = Number(valor).toLocaleString("es-CO");
}

function formatearInteres(input) {
    let valor = input.value.replace("%", "").replace(",", ".").trim();

    if (valor === "" || isNaN(valor)) {
        input.value = "";
        return;
    }

    input.value = valor + "%";
}

function calcular() {
    let montoTexto = document.getElementById("monto").value;
    let interesTexto = document.getElementById("interes").value;
    let cuotas = parseInt(document.getElementById("cuotas").value);

    let monto = parseFloat(limpiarNumero(montoTexto));
    let interes = parseFloat(interesTexto.replace("%", "").replace(",", ".")) / 100;

    if (!monto || isNaN(interes) || !cuotas) {
        alert("Completa todos los campos correctamente");
        return;
    }

    let cuota =
        monto *
        (interes * Math.pow(1 + interes, cuotas)) /
        (Math.pow(1 + interes, cuotas) - 1);

    let saldo = monto;
    let interesTotal = 0;
    let filas = "";

    for (let i = 1; i <= cuotas; i++) {
        let interesCuota = saldo * interes;
        let abonoCapital = cuota - interesCuota;
        saldo = saldo - abonoCapital;

        if (i === cuotas) {
            saldo = 0;
        }

        interesTotal += interesCuota;

        filas += `
            <tr>
                <td>${i}</td>
                <td>$${cuota.toLocaleString("es-CO", {maximumFractionDigits: 0})}</td>
                <td>$${interesCuota.toLocaleString("es-CO", {maximumFractionDigits: 0})}</td>
                <td>$${abonoCapital.toLocaleString("es-CO", {maximumFractionDigits: 0})}</td>
                <td>$${saldo.toLocaleString("es-CO", {maximumFractionDigits: 0})}</td>
            </tr>
        `;
    }

    let totalPagar = cuota * cuotas;

    document.getElementById("resultado").innerHTML = `
        <h2>Resultado</h2>

        <p><strong>Cuota fija:</strong><br>
        $${cuota.toLocaleString("es-CO", {maximumFractionDigits: 0})}</p>

        <p><strong>Total a pagar:</strong><br>
        $${totalPagar.toLocaleString("es-CO", {maximumFractionDigits: 0})}</p>

        <p><strong>Interés total a pagar:</strong><br>
        $${interesTotal.toLocaleString("es-CO", {maximumFractionDigits: 0})}</p>

        <h3>Mini tabla de amortización</h3>

        <div class="tabla-contenedor">
            <table>
                <thead>
                    <tr>
                        <th>Cuota</th>
                        <th>Valor</th>
                        <th>Interés</th>
                        <th>Capital</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
        </div>
    `;
}