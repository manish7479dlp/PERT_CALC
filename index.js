const inputDataTable = document.getElementsByClassName("inputDataTable")[0];

inputDataTable.style.display = "none";

const parent = document.getElementById("dataInputTable");

const partialAnswerTable =
  document.getElementsByClassName("partialAnswerTable")[0];
partialAnswerTable.style.display = "none";

const activityInput = document.getElementById("activityInput");



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
      <p>${te}</p>

  </td>
  <td>
      <p>${sigmaSqr}</p>

  </td>
</tr>
`;
  tr.innerHTML = markup;
  document.getElementsByClassName("calculationteandtpTable")[0].appendChild(tr);
};

const submitActivityInputData = () => {
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


