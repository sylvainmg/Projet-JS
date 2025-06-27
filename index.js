$(document).ready(function(){
    //Animation
    /**************************************************************************************************************************************************************/
    $(".col").hover(
        function(){
            $(this).css({
                "background-color": "#cccccc",
                "border-radius": "1rem",
                "transform": "scale(1.05)",
                "transition": "transform 0.3s ease"
            });
        },
        function(){
            $(this).css({
                "background-color": "",
                "border-radius": "",
                "transform": "",
                "transition": "transform 0.3s ease"
            });
        });

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
    
    //Redirection
    /**************************************************************************************************************************************************************/
    $("#d1").click(function(){
        window.open("Cramer/cramer.html", "_self");
    });

    $("#d2").click(function(){
        window.open("Image/image.html", "_self");
    });

    $("#d3").click(function(){
        window.open("Panneau/panneau.html", "_self");
    });

    $("#d4").click(function(){
        window.open("Datatable/datatable.html", "_self");
    });
    /**************************************************************************************************************************************************************/
});