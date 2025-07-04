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

});


/*on exige le chargement total du HTML avant que les codes JS soient appliqués */
document.addEventListener("DOMContentLoaded", function(){




const image=document.getElementById("image"); 
const widthSlider=document.getElementById("largeur"); 
const heightSlider=document.getElementById("longueur") ; 
const largValue=document.getElementById("spanLarg"); 
const longValue=document.getElementById("spanLong"); 
const imageInput = document.getElementById("imageInput");
const anulBout=document.getElementById("anul"); 


widthSlider.addEventListener("input",()=>{
  image.style.width=widthSlider.value +"px" ; 
console.log("Nouvelle largeur appliquée :", image.style.width);
  
  
  largValue.textContent=widthSlider.value; 
})
heightSlider.addEventListener("input",()=>{
  image.style.height=heightSlider.value +"px" ;
console.log("Nouvelle hauteur appliquée :", image.style.height);
  longValue.textContent=heightSlider.value; })




imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      image.src = e.target.result;
      image.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
  })
 


anulBout.addEventListener(
  "click", function(){
    image.src=""; 
    image.style.display= "none" ; 
  })
}); 