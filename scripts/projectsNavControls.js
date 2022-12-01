var allProjects = [];
var currentIndex = 0;
var lastActive = 1;

$(document).ready(function () {
    allProjects = document.getElementsByClassName("projects-container")[0].children;

    updateProjects();
});
function updateProjects() {
    if (allProjects) {
        allProjects[lastActive].style.display = "none";
        allProjects[currentIndex].style.display = "block";
        lastActive = currentIndex;
        document.getElementById("currentSelected").innerHTML = `${currentIndex + 1}/${allProjects.length}`;
    }
}
function navigate(dir) {
    switch (dir) {
        case "previous":
            if (currentIndex > 0) {
                currentIndex--;
                if (currentIndex == 0) {
                    document.getElementById("btn_prev").disabled = true;
                } else if (currentIndex == allProjects.length - 2) {
                    document.getElementById("btn_next").disabled = false;
                }
                updateProjects();
            }
            break;
        case "next":
            if (currentIndex < allProjects.length - 1) {

                currentIndex++;
                if (currentIndex == allProjects.length - 1) {
                    document.getElementById("btn_next").disabled = true;
                } else if (currentIndex == 1) {
                    document.getElementById("btn_prev").disabled = false;
                }
                updateProjects();
            }
    }

}