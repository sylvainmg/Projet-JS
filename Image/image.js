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