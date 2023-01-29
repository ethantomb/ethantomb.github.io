var allProjects = [];
var currentIndex = 0;
var lastActive = 1;

$(document).ready(function () {
  allProjects = $.makeArray($(".projects-container").children());
  updateProjects(1, true);
  //Prerun the animation at supervisual speed, first time it runs it looks glitch
  for (let i = 0; i < allProjects.length - 1; i++) {
    currentIndex++;
    updateProjects(1);
  }
  for (let i = 0; i < allProjects.length - 1; i++) {
    currentIndex--;
    updateProjects(1);
  }

  
  

});

function updateProjects(len, firstTime = false) {
  if (allProjects) {
    if (!firstTime) {
      /**
       * Hide the previous project
       */
      let l = $(`#project${lastActive}`).children(".imgLeft");
      let r = $(`#project${lastActive}`).children(".imgRight");
      l.animate({ right: "-100%", opacity: "0%" }, 500, "linear");
      r.animate({ left: "-100%", opacity: "0%" }, 500, "linear");


      $(`#project${lastActive}`).slideUp(len, function () {
        l.css("opacity", "0%");
        r.css("opacity", "0%");
        $(this).css("display", "none");

      });
      /**
       * Show the current project
       */

      $(`#project${currentIndex}`).slideDown(len, function () {

        $(this).css("display", "flex");
        l = $(`#project${currentIndex}`).children(".imgLeft");
        r = $(`#project${currentIndex}`).children(".imgRight");
        l.css("display", "block");
        r.css("display", "block");
        l.animate({ opacity: "100%", right: "0%" });
        r.animate({ opacity: "100%", left: "0%" });
        l.css("opacity", "100%");
        r.css("opacity", "100%");
      });

      lastActive = currentIndex;
    } else {
      l = $(`#project${currentIndex}`).children(".imgLeft");
      r = $(`#project${currentIndex}`).children(".imgRight");
      $(`#project${currentIndex}`).css("display", "flex");
      l.animate({ right: "0%" });
      r.animate({ left: "0%" });
      l.css("opacity", "100%");
      r.css("opacity", "100%");
      lastActive = currentIndex;
    }
    $("#currentSelected").text(`${currentIndex + 1}/${allProjects.length}`);
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
        updateProjects(500);
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
        updateProjects(500);
      }
  }
}