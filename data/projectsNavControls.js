var allProjects = [];
var currentIndex=0;
function updateProjects(){
    if(allProjects){
        for(let i=0;i<allProjects.length;i++){
            if(i==currentIndex){
                allProjects[i].style.display="block";
            }else{
                allProjects[i].style.display="none";
            }
        }
    }
}
$(document).ready(function () {
    allProjects = document.getElementsByClassName("projects-container")[0].children;
    console.log(allProjects);
    updateProjects();
});
function showPrevious(){
    if(currentIndex>0){
        currentIndex--;
        updateProjects();
    }
}
function showNext(){
    if(currentIndex<allProjects.length-1){
        currentIndex++;
        updateProjects();
    }
}