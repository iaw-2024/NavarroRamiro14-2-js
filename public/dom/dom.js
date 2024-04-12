function renderTable() {
    fetch("../datos.json")
        .then(res => res.json())
        .then(datos => {
            const tabla = document.createElement("table");
            tabla.className = "min-w-full divide-y divide-gray-200";

            const thead = document.createElement("thead");
            thead.className = "bg-gray-50";

            const tbody = document.createElement("tbody");
            tbody.className = "bg-white divide-y divide-gray-200";

            const filaEncabezado = document.createElement("tr");
            Object.keys(datos[0]).forEach(key => {
                const th = document.createElement("th");
                th.textContent = key;
                th.className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
                filaEncabezado.appendChild(th);
            });
            thead.appendChild(filaEncabezado);
            tabla.appendChild(thead);

            datos.forEach(item => {
                const fila = document.createElement("tr");
                Object.entries(item).forEach(([key, valor]) => {
                    const td = document.createElement("td");
                    td.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
                    //if key === segment, make it bold uppercase
                    if (key === 'segment' && typeof valor === 'string') {
                        td.className = "px-6 py-4 whitespace-nowrap uppercase font-bold text-gray-500";
                        td.textContent = valor;
                    } else
                        if (key === 'image' && typeof valor === 'string') {
                            td.className = 'whitespace-nowrap py-2';
                            const img = document.createElement('img');
                            img.src = "../" + valor;
                            img.alt = 'Image';
                            img.className = 'object-contain h-20 rounded-full mx-auto';
                            td.appendChild(img);
                        } else {
                            td.textContent = valor;
                        }
                    fila.appendChild(td);
                });
                tbody.appendChild(fila);
            });
            tabla.appendChild(tbody);
            document.body.appendChild(tabla);
        });
}

