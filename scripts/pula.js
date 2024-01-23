document.querySelector("div#default").remove();
const customDiv = document.createElement("div");
customDiv.setAttribute("id", "customDiv");
customDiv.innerText = "Dynamically added HTML element";
document.body.append(customDiv);
