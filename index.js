const inputDataTable = document.getElementsByClassName("inputDataTable")[0];

inputDataTable.style.display = "none";

const parent = document.getElementById("dataInputTable");

const partialAnswerTable =
  document.getElementsByClassName("partialAnswerTable")[0];
const answerContainer = document.getElementById("answerContainer");
answerContainer.style.display = "none";

const activityInput = document.getElementById("activityInput");

const calculationOfForwardAndBackwardMoment = document.getElementById(
  "calculationOfForwardAndBackwardMoment"
);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const insertPatialAnswer = (internalData) => {
  const te = parseInt(
    (parseInt(internalData.to) +
      4 * internalData.tm +
      parseInt(internalData.tp)) /
      6
  );
  let sigmaSqr = parseInt((internalData.tp - internalData.to) / 6);
  sigmaSqr *= sigmaSqr;
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
  const parentTable = document.getElementsByClassName(
    "calculationteandtpTable"
  )[0];

  removeAllChildNodes(parentTable);

  const caption = document.createElement("caption");
  caption.innerHTML = "Calculation of t<sub>e</sub> & t<sub>p</sub>";

  parentTable.appendChild(caption);

  const tr1 = document.createElement("tr");
  const firstHeadingMarkup = `<th style="font-size: 3rem;" rowspan="2">Activity</th>
  <th colspan="5">Extimated Duration in Weeks</th>`;
  tr1.innerHTML = firstHeadingMarkup;
  parentTable.appendChild(tr1);

  const tr2 = document.createElement("tr");
  const headingMarkup = `<th>Optimistic ( t<sub>o</sub> )</th>
  <th>MostLikely ( t<sub>m</sub> )</th>
  <th>Pessimistic ( t<sub>p</sub> )</th>
  <th> t<sub>e</sub> </th>
  <th>t<sub>p</sub> </th>`;

  tr2.innerHTML = headingMarkup;
  parentTable.appendChild(tr2);
};

const boilerPlateOfFWAndBWMoment = () => {
  removeAllChildNodes(calculationOfForwardAndBackwardMoment);

  const caption = document.createElement("caption");
  caption.innerText = "Forward & Backward Moment of Each Event";

  calculationOfForwardAndBackwardMoment.appendChild(caption);

  partialAnswerTable.style.display = "block";
  const TotalActivityNumber = parseInt(activityInput.value);
  const tr = document.createElement("tr");
  const markup = `<tr>
  <th>Event</th>
  <th>Forward Moment</th>
  <th>Backward Moment</th>
</tr>`;

  tr.innerHTML = markup;

  calculationOfForwardAndBackwardMoment.appendChild(tr);
};

const calcForwardMoment = (data, arrSize) => {
  let forwardMoment = new Array(arrSize);

  for (let i = 0; i < forwardMoment.length; i++) {
    forwardMoment[i] = 0;
  }

  for (let i = 0; i < data.length; i++) {
    if (
      forwardMoment[data[i].sEvent] + data[i].te >
      forwardMoment[data[i].lEvent]
    ) {
      forwardMoment[data[i].lEvent] =
        forwardMoment[data[i].sEvent] + data[i].te;
    }
  }

  return forwardMoment;
};

const calcBackwardMoment = (data , arrSize ,backwardMomentInitialValue) => {
  let backwardMoment = new Array(arrSize);
  
  for(let i = 0; i < backwardMoment.length; i++) {
    backwardMoment[i] = 0;
  }

  backwardMoment[backwardMoment.length -1] = backwardMomentInitialValue; 

    for (let i = data.length - 1; i >= 0; i--) {
    sEvent = parseInt(data[i].sEvent);
    lEvent = parseInt(data[i].lEvent);
    te = parseInt(data[i].te);


    if (
      backwardMoment[sEvent] == 0 ||
      backwardMoment[sEvent] > backwardMoment[lEvent] - te
    ) {
      backwardMoment[sEvent] = backwardMoment[lEvent] - te;
    }
  }

  return backwardMoment;

}

const displayCriticalPath = (forwardMoment , backwardMoment) => {
   const criticalPathContainer = document.getElementById("criticalPathContainer");

   removeAllChildNodes(criticalPathContainer)

   let criticalPath = "";

   for(let i = 1; i < forwardMoment.length; i++) {
    if(forwardMoment[i] === backwardMoment[i]) {
      if(criticalPath === "") {
        criticalPath = i;
      } else {
        criticalPath = criticalPath + " ==> " + i;
      }
    }
   }

   const h2 = document.createElement("h2")
   criticalPathContainer.innerText = criticalPath;

  //  criticalPathContainer.appendChild(h2);
}

const submitActivityInputData = () => {
  boilerPlateOfPartialAnserTable();
  answerContainer.style.display = "block";

  const TotalActivityNumber = parseInt(activityInput.value);

  const child = parent.children;
  const innerChild = child[3].children;

  let data = [];
  let MAX = 0;

  for (let i = 0; i < TotalActivityNumber; i++) {
    let idx = i + 3;
    const child = parent.children;
    const innerChild = child[idx].children;
    let internalData = {
      sEvent: innerChild[0].children[0].value,
      lEvent: innerChild[0].children[1].value,
      to: innerChild[1].children[0].value,
      tm: innerChild[2].children[0].value,
      tp: innerChild[3].children[0].value,
    };

    if (internalData.lEvent > MAX) {
      MAX = internalData.lEvent;
    }

    const te = parseInt(
      (parseInt(internalData.to) +
        4 * internalData.tm +
        parseInt(internalData.tp)) /
        6
    );
    let sigmaSqr = parseInt((internalData.tp - internalData.to) / 6);
    sigmaSqr *= sigmaSqr;

    internalData = { ...internalData, te, sigmaSqr };

    data = [...data, internalData];

    insertPatialAnswer(internalData);
  }

  const forwardMoment = calcForwardMoment(data, parseInt(MAX) + 1);
  const backwardMoment = calcBackwardMoment(data , parseInt(MAX) + 1 , forwardMoment[forwardMoment.length - 1]);



  // add caption and th data into forward and backward calculation table
  boilerPlateOfFWAndBWMoment();

  for (let i = 1; i < TotalActivityNumber; i++) {
    const tr = document.createElement("tr");
    const markup = `
     <td>${i}</td>
     <td>${forwardMoment[i]}</td>
     <td>${backwardMoment[i]}</td>`;

    tr.innerHTML = markup;

    calculationOfForwardAndBackwardMoment.appendChild(tr);
  }

  displayCriticalPath(forwardMoment , backwardMoment);
  
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
