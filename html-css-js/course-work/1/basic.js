/*⭐make js work⭐*/
if (document.readyState !== "loading") {
    console.log("Document is ready!");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        initializeCode();
    });
}
/*⭐make js work⭐*/

let chrCounter = 0;

function initializeCode() {
    const sendIdea = document.getElementById("send-idea");
    const rmIdea = document.getElementById("remove-idea");

    sendIdea.addEventListener("click", function() {
        const ideas = document.getElementById("ideas");
        let ideaText = document.getElementById("idea").value;

        if (ideaText.trim() !== "") {  // Prevent empty input from being added
            let newParagraph = document.createElement("p");
            newParagraph.innerText = ++chrCounter + ". " + ideaText;
            ideas.appendChild(newParagraph);
        }
    });

    rmIdea.addEventListener("click", function() {
        const ideas = document.getElementById("ideas");
        if (ideas.lastChild) {  // Check if there's something to remove
            ideas.removeChild(ideas.lastChild);
            chrCounter--;
        }
    });
}



/*console.log("Hi");

let numbers = [];

    numbers.push(8);
    numbers.push(18);
    numbers.push(32);
    numbers.push(254);

    console.log(numbers);

    numbers.unshift(888);

    console.log(numbers);

    let number = numbers.pop();

    console.log(numbers);
    console.log(number);

    let student = {
        name: "Gendry",
        id: "99990"
    }

    let students = [];

    students.push(student);
    students.push({name: "Seyren", id: "00028"});
    students.push({name: "Gale", id: "99900"});
    students.push({name: "Rein", id: "00124"});
    students.push({name: "Shane", id: "00092"});

    console.log(students);

    students.forEach(s=> console.log(s));

    while (students.length > 0) {
        console.log9students.pop()
    }
    console.log(students);*/
    
