$(document).ready(function(){
    //Animation
    /**************************************************************************************************************************************************************/
    $(".item").hover(function(){
        $(this).css({
                "transform": "scale(1.01)",
                "transition": "transform 0.3s ease"
            });
        },
        function(){
            $(this).css({
                "transform": "",
                "transition": "transform 0.3s ease"
            });
    });
    /**************************************************************************************************************************************************************/
const pubs = document.querySelectorAll(".pub");
var index = 0;

// Fonction pour changer la pub
function changerPub() {
  // Masquer toutes les pubs
  pubs.forEach((el, i) => {
    el.classList.remove("active");
    el.style.transform = "rotateY(180deg)";
  });

  // Afficher la pub courante avec rotation
  pubs[index].classList.add("active");
  pubs[index].style.transform = "rotateY(0deg)";

  // Prochaine pub
  index = (index + 1) % pubs.length;
}

// Démarrer la rotation toutes les 3 secondes
changerPub(); // Première pub
setInterval(changerPub, 4000);
});
