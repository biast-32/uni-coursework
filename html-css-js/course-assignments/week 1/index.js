if (document.readyState !== "loading") {
    console.log("Document is ready!");
    initializaCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initializaCode();
    })
}


function initializaCode(){
    const sayHello = document.getElementById("my-button");
    const text = document.getElementById("text");
    const addData = document.getElementById("add-data");
    const list = document.getElementById("my-list");
      
    sayHello.addEventListener("click", function() {
      console.log("hello world");
      text.textContent = "Moi maailma";
    })

    addData.addEventListener("click", function(){
        const container = document.getElementById("textarea").value;
        const element = document.createElement("li");
        element.innerText = container;
        list.appendChild(element);
    })
}