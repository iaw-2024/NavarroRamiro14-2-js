const express = require("express");
const app = express();
const fs = require("fs");

app.get("/express", (req, res) => {
  const html = fs.readFileSync("./public/express/index.html", "utf8");
  fs.readFile("./public/datos.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const json = JSON.parse(data);
      let table = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200">';
      table += '<thead class="bg-gray-50">';
      table += "<tr>";
      for (let i = 0; Object.keys(json[0]).length > i; i++) {
        table +=
          '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">' +
          Object.keys(json[0])[i] +
          "</th>";
      }
      table += "</tr>";
      table += "</thead>";
      table += '<tbody class="bg-white divide-y divide-gray-200">';
      for (let i = 0; json.length > i; i++) {
        table += "<tr>";
        for (let j = 0; Object.keys(json[i]).length > j; j++) {
          const value = json[i][Object.keys(json[i])[j]];
          const key = Object.keys(json[i])[j];
          if (key === "segment") {
            table +=
              '<td class="px-6 py-4 whitespace-nowrap uppercase font-bold">' +
              value +
              "</td>";
          } else if (key === "image") {
            table +=
              '<td class="whitespace-nowrap py-2">' +
              '<img class="object-contain h-20 rounded-full mx-auto" src="' +
              value +
              '" alt="" />' +
              "</td>";
          } else {
            table +=
              '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">' +
              value +
              "</td>";
          }
        }
        table += "</tr>";
      }
      table += "</tbody>";
      table += "</table></div>";
      res.send(html.replace("<Tabla/>", table));
    }
  });
});

app.get("/datos", (req, res) => {
  fs.readFile("./public/datos.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get("/cliente_servidor", (req, res) => {
  fs.readFile("./public/cliente_servidor/index.html", "utf8", (err, data) => {
      if (err) {
          console.log(err);
      } else {
          res.send(data);
      }   
  });
})

app.use(express.static("public"));

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
