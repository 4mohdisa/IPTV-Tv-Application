var currentIndex = 0;
var elements = document.querySelector(".card");

// document.addEventListener("tizenhwkey", function (e) {
//   if (e.keyName === "left") {
//     // Move the focus to the previous element
//     currentIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
//     elements[currentIndex].focus();
//   } else if (e.keyName === "right") {
//     // Move the focus to the next element
//     currentIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
//     elements[currentIndex].focus();
//   } else if (e.keyName === "up") {
//     // Move the focus to the element above
//     var row = Math.floor(currentIndex / 4);
//     var col = currentIndex % 4;
//     row = row > 0 ? row - 1 : elements.length / 4 - 1;
//     currentIndex = row * 4 + col;
//     elements[currentIndex].focus();
//   } else if (e.keyName === "down") {
//     // Move the focus to the element below
//     var row = Math.floor(currentIndex / 4);
//     var col = currentIndex % 4;
//     row = row < elements.length / 4 - 1 ? row + 1 : 0;
//     currentIndex = row * 4 + col;
//     elements[currentIndex].focus();
//   }
// });

//Initialize function
var init = function () {
  // TODO:: Do your initialization job
  console.log("init() called");

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Something you want to do when hide or exit.
    } else {
      // Something you want to do when resume.
    }
  });

  // add eventListener for keydown
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37:
        console.log("LEFT"); //LEFT arrow
        break;
      case 38:
        console.log("UP"); //UP arrow
        break;
      case 39:
        console.log("RIGHT"); //RIGHT arrow
        break;
      case 40:
        console.log("DOWN"); //DOWN arrow
        break;
      case 13:
        console.log("OK"); //OK button
        break;
      case 10009: //RETURN button
        tizen.application.getCurrentApplication().exit();
        break;
      default:
        console.log("Key code : " + e.keyCode);
        break;
    }
  });
};
// window.onload can work without <body onload="">
window.onload = init;
