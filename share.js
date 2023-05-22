
document.addEventListener("DOMContentLoaded", function(event) {
    var buttons = document.querySelectorAll(".social_share");
    JSShare.options.url = window.location.href;
    JSShare.options.image = "https://www.n-py.com/sites/n-py.com/files/images/paragraphs/2-images/N%27PY_Ski%20%2B%20%281%29%20%281%29.jpg";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function() {
        return JSShare.go(this);
      }, false);
    }
  });


  console.log(document.title)