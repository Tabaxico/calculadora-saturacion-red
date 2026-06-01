let grafico;

function calcularRed() {

    const dispositivos =
        Number(
            document.getElementById("dispositivos").value
        );

    if (dispositivos <= 0 || isNaN(dispositivos)) {

        document.getElementById("resultado").innerHTML =
            "<p>Ingrese una cantidad válida de dispositivos.</p>";

        return;
    }

    const rendimiento =
        (-0.05 * Math.pow(dispositivos, 2))
        + (8 * dispositivos)
        + 100;

    let estado = "";
    let recomendacion = "";

    if (dispositivos <= 50) {

        estado = "🟢 Red Estable";

        recomendacion =
            "La red funciona correctamente y no presenta problemas de rendimiento.";

    }
    else if (dispositivos <= 80) {

        estado = "🟡 Red Exigida";

        recomendacion =
            "La red se encuentra cerca de su capacidad óptima. Se recomienda monitorear el tráfico.";

    }
    else {

        estado = "🔴 Saturación Detectada";

        recomendacion =
            "La red ha superado el punto óptimo y puede presentar lentitud, pérdida de paquetes o tiempos de respuesta elevados.";

    }

    document.getElementById("resultado").innerHTML = `

        <h2>Resultado del análisis</h2>

        <p>
            <strong>Dispositivos conectados:</strong>
            ${dispositivos}
        </p>

        <p>
            <strong>Rendimiento estimado:</strong>
            ${rendimiento.toFixed(2)}
        </p>

        <p>
            <strong>Estado:</strong>
            ${estado}
        </p>

        <hr>

        <h2>Análisis Matemático</h2>

        <p>
            <strong>Función utilizada:</strong>
            R(x) = -0.05x² + 8x + 100
        </p>

        <p>
            <strong>Derivada:</strong>
            R'(x) = -0.1x + 8
        </p>

        <p>
            <strong>Punto crítico:</strong>
            R'(x) = 0
        </p>

        <p>
            <strong>Resultado:</strong>
            x = 80 dispositivos
        </p>

        <p>
            <strong>Interpretación:</strong>
            La red alcanza su máximo rendimiento con 80 dispositivos conectados.
            Después de este punto comienza la saturación y el rendimiento disminuye.
        </p>

        <p>
            <strong>Recomendación:</strong>
            ${recomendacion}
        </p>
    `;

    const datosX = [];
    const datosY = [];

    for (let i = 0; i <= 120; i++) {

        datosX.push(i);

        datosY.push(
            (-0.05 * Math.pow(i, 2))
            + (8 * i)
            + 100
        );
    }

    const ctx =
        document.getElementById("graficoRed");

    if (grafico) {

        grafico.destroy();
    }

    grafico = new Chart(ctx, {

        type: "line",

        data: {

            labels: datosX,

            datasets: [

                {
                    label: "Rendimiento de la Red",

                    data: datosY,

                    borderWidth: 3,

                    tension: 0.3
                }
            ]
        },

        options: {

            responsive: true,

            plugins: {

                title: {

                    display: true,

                    text: "Comportamiento del Rendimiento de la Red"
                }
            },

            scales: {

                x: {

                    title: {

                        display: true,

                        text: "Cantidad de Dispositivos"
                    }
                },

                y: {

                    title: {

                        display: true,

                        text: "Rendimiento"
                    }
                }
            }
        }
    });
}