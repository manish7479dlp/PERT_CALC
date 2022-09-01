const inputDataTable = document.getElementsByClassName("inputDataTable")[0];

inputDataTable.style.display = "none"

const getActivityNumber = () => {
  const activityInput = document.getElementById("activityInput");
  const errorMessage = document.getElementById("errorMessage");

  const activityInputContainer = document.getElementsByClassName(
    "activityInputContainer"
  )[0];

  const TotalActivityNumber = parseInt(activityInput.value)

  if (TotalActivityNumber) {
    errorMessage.style.display = "none";
    activityInputContainer.style.display = "none";
    inputDataTable.style.display = "block";

    for(let i = 0; i <  TotalActivityNumber; i++) {
        console.log(i);
        insertInputFieldInPERT()
    }

  } else {
    errorMessage.style.display = "block";
  }
};

const insertInputFieldInPERT = () => {
 const parent = document.getElementById("dataInputTable");
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

tr.innerHTML = markup

parent.appendChild(tr);


};
