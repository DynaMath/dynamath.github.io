function generateTable() {
  var data = score_table; // The variable from model_scores.js
  
  var table = '<table class="js-sort-table" id="results">';
  
  // Table header
  table += `<tr>
          <td class="js-sort"><strong>Model</strong></td>
          <td class="js-sort-number" onclick="sortTable(1)"><strong><u>ALL</u></strong></td>
          <td class="js-sort-number" onclick="sortTable(2)"><strong>PG</strong></td>
          <td class="js-sort-number" onclick="sortTable(3)"><strong>SG</strong></td>
          <td class="js-sort-number" onclick="sortTable(4)"><strong>AG</strong></td>
          <td class="js-sort-number" onclick="sortTable(5)"><strong>AL</strong></td>
          <td class="js-sort-number" onclick="sortTable(6)"><strong>PT</strong></td>
          <td class="js-sort-number" onclick="sortTable(7)"><strong>GT</strong></td>
          <td class="js-sort-number" onclick="sortTable(8)"><strong>ST</strong></td>
          <td class="js-sort-number" onclick="sortTable(9)"><strong>SF</strong></td>
          <td class="js-sort-number" onclick="sortTable(10)"><strong>AR</strong></td>
          <td class="js-sort-number" onclick="sortTable(11)"><strong>EL</strong></td>
          <td class="js-sort-number" onclick="sortTable(12)"><strong>HI</strong></td>
          <td class="js-sort-number" onclick="sortTable(13)"><strong>UN</strong></td>
      </tr>`;

  // Adding Closed-sourced LLMs header
  table += '<tr><td colspan="15"><strong>Closed-sourced LLMs</strong></td></tr>';
  

  // Get all keys in data
  var keys = Object.keys(data);
  var openSourceFlag = false; // For inserting the Open-sourced VLMs row later

  // Loop through the sorted data
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var entry = data[key];

    // Insert "Open-sourced VLMs" header when we transition to the first open-source entry
    if (!openSourceFlag && key.startsWith("Qwen2")) {
      openSourceFlag = true;
      table += '<tr><td colspan="15"><strong>Open-sourced VLMs</strong></td></tr>';
    }

    if (key === 'Human Performance') {
      table += '<tr><td colspan="14" style="text-align: center;"><strong>Human</strong></td></tr>';
    }

    // Row data
    table += '<tr>';
    // table += `<td>${key}</td>`;
    table += `<td><strong>${entry.Model}</strong></td>`;
    
    // Add scores and format them correctly with 1 decimal precision
    table += `<td><strong>${entry.ALL.toFixed(1)}</strong></td>`;
    table += `<td>${entry.PG.toFixed(1)}</td>`;
    table += `<td>${entry.SG.toFixed(1)}</td>`;
    table += `<td>${entry.AG.toFixed(1)}</td>`;
    table += `<td>${entry.AL.toFixed(1)}</td>`;
    table += `<td>${entry.PT.toFixed(1)}</td>`;
    table += `<td>${entry.GT.toFixed(1)}</td>`;
    table += `<td>${entry.ST.toFixed(1)}</td>`;
    table += `<td>${entry.SF.toFixed(1)}</td>`;
    table += `<td>${entry.AR.toFixed(1)}</td>`;
    table += `<td>${entry.EL.toFixed(1)}</td>`;
    table += `<td>${entry.HI.toFixed(1)}</td>`;
    table += `<td>${entry.UN.toFixed(1)}</td>`;
    table += '</tr>';

    // table += `<td style="background-color: #FFD700;">${entry.EL.toFixed(1)}</td>`; // Gold
    // table += `<td style="background-color: #FF4500;">${entry.HI.toFixed(1)}</td>`; // OrangeRed
    // table += `<td style="background-color: #8A2BE2;">${entry.UN.toFixed(1)}</td>`; // BlueViolet
    // table += '</tr>';
  }

  table += '</table>';
  document.getElementById('average-acc').innerHTML = table; 
}

// Call the function when the window loads
window.onload = generateTable;

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("results");
  switching = true;
  // Set the sorting direction to ascending
  dir = "asc"; 

  // Loop to keep switching until the table is sorted
  while (switching) {
    switching = false;
    rows = table.rows;

    // Loop through all table rows except the headers
    for (i = 2; i < (rows.length - 1); i++) {  // Start at 2 to skip the header and first group row
      shouldSwitch = false;

      // Compare two elements in the current row and the next row
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      // Check if the two rows should switch place, based on the direction (asc/desc)
      if (dir === "asc") {
        if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "desc") {
        if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      // Switch the rows and mark that a switch has been done
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      // If no switching has been done AND the direction is "asc", set the direction to "desc" and loop again.
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


// function generateTable() {
//   var data = score_table; // The variable from model_scores.js

//   var table = '<table class="js-sort-table" id="results">';
//   table += `<tr>
//           <td class="js-sort-number"><strong>#</strong></td>
//           <td class="js-sort"><strong>Model</strong></td>
//           <td class="js-sort"><strong>Method</strong></td>
//           <td class="js-sort"><strong>Source</strong></td>
//           <td class="js-sort"><strong>Date</strong></td>
//           <td class="js-sort-number"><strong><u>ALL</u></strong></td>
//           <td class="js-sort-number"><strong>FQA</strong></td>
//           <td class="js-sort-number"><strong>GPS</strong></td>
//           <td class="js-sort-number"><strong>MWP</strong></td>
//           <td class="js-sort-number"><strong>TQA</strong></td>
//           <td class="js-sort-number"><strong>VQA</strong></td>
//           <td class="js-sort-number"><strong>ALG</strong></td>
//           <td class="js-sort-number"><strong>ARI</strong></td>
//           <td class="js-sort-number"><strong>GEO</strong></td>
//           <td class="js-sort-number"><strong>LOG</strong></td>
//           <td class="js-sort-number"><strong>NUM</strong></td>
//           <td class="js-sort-number"><strong>SCI</strong></td>
//           <td class="js-sort-number"><strong>STA</strong></td>
//       </tr>`;

//       // sort data to make sure the best model is on top
//       first_row = '-' // "Human Performance*"
//       console.log(data);

//       // get all keys in data
//       var keys = Object.keys(data);

//       // remove "Human Performance*" from keys
//       var index = keys.indexOf(first_row);
//       if (index > -1) {
//         keys.splice(index, 1);
//       }

//       // add "Human Performance*" to the top of keys
//       keys.unshift(first_row);

//       console.log(keys);

//       // for (var key in data) {
//       for (var i=0; i<keys.length; i++) {
//         var key = keys[i];
//         console.log(key);
//         var entry = data[key];

//         table += '<tr>';
//         table += `<td>${key}</td>`

//         // for key = "1", "2", "3"
//         top_ranks = ["1", "2", "3"]
//         if (top_ranks.includes(key)) {
//           table += `<td><b class="best-score-text">${entry.Model}</b></td>`;
//           table += `<td>${entry.Method}</td>`;
//           table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
//           table += `<td>${entry.Date}</td>`;
//           table += `<td><b class="best-score-text">${entry.ALL.toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
//         }
//         else {
//           table += `<td><b>${entry.Model}</b></td>`;
//           table += `<td>${entry.Method}</td>`;
//           table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
//           table += `<td>${entry.Date}</td>`;
//           table += `<td><b>${entry.ALL.toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
//         }          

//         // if entry.FQA is a number
//         if (!isNaN(entry.FQA)) {
//           table += `<td>${entry.FQA.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.GPS.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.MWP.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.TQA.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.VQA.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.ALG.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.ARI.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.GEO.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.LOG.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.NUM.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.SCI.toFixed(1).toString()}</td>`;
//           table += `<td>${entry.STA.toFixed(1).toString()}</td>`;
//         }
//         else {
//         table += `<td>${entry.FQA.toString()}</td>`;
//         table += `<td>${entry.GPS.toString()}</td>`;
//         table += `<td>${entry.MWP.toString()}</td>`;
//         table += `<td>${entry.TQA.toString()}</td>`;
//         table += `<td>${entry.VQA.toString()}</td>`;
//         table += `<td>${entry.ALG.toString()}</td>`;
//         table += `<td>${entry.ARI.toString()}</td>`;
//         table += `<td>${entry.GEO.toString()}</td>`;
//         table += `<td>${entry.LOG.toString()}</td>`;
//         table += `<td>${entry.NUM.toString()}</td>`;
//         table += `<td>${entry.SCI.toString()}</td>`;
//         table += `<td>${entry.STA.toString()}</td>`;
//         }
//         table += '</tr>';
//     }

//   table += '</table>';
//   document.getElementById('testmini_leaderboard').innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
// }

// // Call the function when the window loads
// window.onload = generateTable;
