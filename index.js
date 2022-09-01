const inputDataTable = document.getElementsByClassName("inputDataTable")[0];

inputDataTable.style.display = "none";

const parent = document.getElementById("dataInputTable");

const partialAnswerTable =
  document.getElementsByClassName("partialAnswerTable")[0];
partialAnswerTable.style.display = "none";

const activityInput = document.getElementById("activityInput");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


const insertPatialAnswer = (internalData) => {
  // const te = parseInt((internalData.to + (4 * internalData.tm) + internalData.tp) / 6);

  const te = parseInt((parseInt(internalData.to) + (4 * internalData.tm) + parseInt(internalData.tp)) / 6)
  let sigmaSqr = parseInt((internalData.tp - internalData.to) / 6);
  sigmaSqr *= sigmaSqr
  const tr = document.createElement("tr");

  const markup = ` <tr>
  <td>
      <p>${internalData.sEvent}</p>
      -
      <p>${internalData.lEvent}</p>
  </td>

  <td>
      <p>${internalData.to}</p>
  </td>
  <td>
      <p>${internalData.tm}</p>

  </td>
  <td>

      <p>${internalData.tp}</p>

  </td>
  <td>
      <p style="color:red;">${te}</p>

  </td>
  <td>
      <p style="color:red;">${sigmaSqr}</p>

  </td>
</tr>
`;
  tr.innerHTML = markup;
  document.getElementsByClassName("calculationteandtpTable")[0].appendChild(tr);
};

const boilerPlateOfPartialAnserTable = () => {
  const parentTable = document.getElementsByClassName("calculationteandtpTable")[0];

  removeAllChildNodes(parentTable)

  const caption = document.createElement("caption");
  caption.innerHTML = "Calculation of t<sub>e</sub> & t<sub>p</sub>"

  parentTable.appendChild(caption);
  
  const tr1 = document.createElement("tr");
  const firstHeadingMarkup = `<th style="font-size: 3rem;" rowspan="2">Activity</th>
  <th colspan="5">Extimated Duration in Weeks</th>`
  tr1.innerHTML = firstHeadingMarkup;
  parentTable.appendChild(tr1);

  

  const tr2 = document.createElement("tr");
  const headingMarkup = `<th>Optimistic ( t<sub>o</sub> )</th>
  <th>MostLikely ( t<sub>m</sub> )</th>
  <th>Pessimistic ( t<sub>p</sub> )</th>
  <th> t<sub>e</sub> </th>
  <th>t<sub>p</sub> </th>`

  tr2.innerHTML = headingMarkup;
  parentTable.appendChild(tr2);


//   const tableHeading = `  <tr style="background-color: transparent;">
  // <th>Optimistic ( t<sub>o</sub> )</th>
  // <th>MostLikely ( t<sub>m</sub> )</th>
  // <th>Pessimistic ( t<sub>p</sub> )</th>
  // <th> t<sub>e</sub> </th>
  // <th>t<sub>p</sub> </th>
// </tr>`

// partialAnswerTable.appendChild(tableHeading);

}

const submitActivityInputData = () => {

  boilerPlateOfPartialAnserTable()
  partialAnswerTable.style.display = "block";
  const TotalActivityNumber = parseInt(activityInput.value);


  const child = parent.children;
  const innerChild = child[3].children
  console.log(innerChild[1].children[0].value);
 


  for(let i = 0; i < TotalActivityNumber; i++) {
    let idx = i + 3;
    const child = parent.children;
    const innerChild = child[idx].children
    const internalData = {
      sEvent : innerChild[0].children[0].value,
      lEvent : innerChild[0].children[1].value,
      to : innerChild[1].children[0].value,
      tm : innerChild[2].children[0].value,
      tp : innerChild[3].children[0].value
    }

    console.log(internalData);
    insertPatialAnswer(internalData);
  }
};

const insertInputFieldInPERT = () => {
  const tr = document.createElement("tr");
  const markup = ` <td>
    <input type="number">
    -
    <input type="number">
</td>
<td>
    <input type="number">
</td>
<td>
    <input type="number">
</td>
<td>
    <input type="number">
</td>`;

  tr.innerHTML = markup;

  parent.appendChild(tr);
};

const getActivityNumber = () => {
  const activityInput = document.getElementById("activityInput");
  const errorMessage = document.getElementById("errorMessage");

  const activityInputContainer = document.getElementsByClassName(
    "activityInputContainer"
  )[0];

  const TotalActivityNumber = parseInt(activityInput.value);

  if (TotalActivityNumber <= 50) {
    errorMessage.style.display = "none";
    activityInputContainer.style.display = "none";
    inputDataTable.style.display = "block";

    for (let i = 0; i < TotalActivityNumber; i++) {
      console.log(i);
      insertInputFieldInPERT();
    }

    const button = document.createElement("a");
    button.setAttribute("onclick", "submitActivityInputData()");
    button.setAttribute("href", "#partialAnswerTable");
    button.className = "submitInputDataButton";
    button.innerText = "Submit";

    inputDataTable.appendChild(button);
  } else if (TotalActivityNumber > 50) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Please Enter Activity number between 50";
  } else {
    errorMessage.style.display = "block";
  }
};


