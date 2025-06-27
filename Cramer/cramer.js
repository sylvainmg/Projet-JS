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

    //Choix de l'ensemble
    const select = $("#ensemble");
    const reel = $("#reel");
    const complexe = $("#complexe");

    select.on("change", function(){
        if ($(this).val() === "reel") {
            reel.show();
            complexe.hide();
        } else {
            reel.hide();
            complexe.show();
        }
    });
    
    var results = $("#results");
    var rapport = $(".rapport");
     
    var message = $("#message");
    message.hide(); //Cacher le message de rapport

    function determinant(a, b, c, d, e, f, g, h, i){
        return a*e*i + b*f*g + c*d*h - g*e*c - h*f*a - i*d*b;
    }

    //Réel
    $("#submit-reel").on("click", function(e){
        e.preventDefault(); //Empêche le rechargement de la page
        //Inputs

        var a1 = parseFloat($("#a1").val());
        var b1 = parseFloat($("#b1").val());
        var c1 = parseFloat($("#c1").val());
        var d1 = parseFloat($("#d1").val());

        var a2 = parseFloat($("#a2").val());
        var b2 = parseFloat($("#b2").val());
        var c2 = parseFloat($("#c2").val());
        var d2 = parseFloat($("#d2").val());

        var a3 = parseFloat($("#a3").val());
        var b3 = parseFloat($("#b3").val());
        var c3 = parseFloat($("#c3").val());
        var d3 = parseFloat($("#d3").val());

        /*******************************************************/

        //Test si NaN
        if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(d1) || isNaN(a2) || isNaN(b2) || isNaN(c2) || isNaN(d2) || isNaN(a3) || isNaN(b3) || isNaN(c3) || isNaN(d3)) {
            results.removeClass("bg-success");
            results.addClass("bg-danger");
            results.html("Veuillez ne saisir dans les champs que des valeurs numériques valides.");
            rapport.html("");
            message.hide();
            return;
        }

        //Déterminants
        var D, Dx, Dy, Dz;
        D = determinant(a1, b1, c1, a2, b2, c2, a3, b3, c3);
        Dx = determinant(d1, b1, c1, d2, b2, c2, d3, b3, c3); 
        Dy = determinant(a1, d1, c1, a2, d2, c2, a3, d3, c3);
        Dz = determinant(a1, b1, d1, a2, b2, d2, a3, b3, d3);

        //Résultats
        message.show(); //Afficher le message de rapport
        if (D === 0) {
            if (Dx === 0 && Dy === 0 && Dz === 0) {
                results.removeClass("bg-danger");
                results.addClass("bg-success");
                results.html("Il existe une infinité de solutions à ce système.");
                rapport.html("\\(\\Delta = 0\\) et \\(\\Delta_x = \\Delta_y = \\Delta_z = 0.\\) D'où l'infinité de solutions.");
                MathJax.typeset();
            } else {
                results.removeClass("bg-danger");
                results.addClass("bg-success");
                results.html("Ce système ne possède aucune solution.");
                rapport.html("\\(\\Delta = 0\\) et \\(\\Delta_x = " + Dx + ", \\Delta_y = " + Dy + ", \\Delta_z = " + Dz + ".\\) D'où l'inexistence de solutions.");
                MathJax.typeset();
            }
        } else {
            let x = Dx / D, y = Dy / D, z = Dz / D;
            results.removeClass("bg-danger");
            results.addClass("bg-success");
            results.html("\\(x\\) = " + x + "<br>\\(y\\) = " + y + "<br>\\(z\\) = " + z);
            rapport.html("\\(\\Delta = " + D + "\\), \\(\\Delta_x = " + Dx + ", \\Delta_y = " + Dy + "\\) et \\(\\Delta_z = " + Dz + ".\\) D'où l'existence de solutions.");
            MathJax.typeset();
        }

    });

    //Complexe

    //Fonctions
    function produit(a, b, c, d, e, f){
        return [e*(a*c - b*d) - f*(b*c + a*d), e*(b*c + a*d) + f*(a*c - b*d)];
    }

    function fraction(a, b, c, d){
        return [(a*c + b*d)/(c*c + d*d), (b*c - a*d)/(c*c + d*d)];
    }

    function determinant_c(Re_a, Im_a, Re_b, Im_b, Re_c, Im_c, Re_d, Im_d, Re_e, Im_e, Re_f, Im_f, Re_g, Im_g, Re_h, Im_h, Re_i, Im_i) {
        let p1 = produit(Re_a, Im_a, Re_e, Im_e, Re_i, Im_i);
        let p2 = produit(Re_b, Im_b, Re_f, Im_f, Re_g, Im_g);
        let p3 = produit(Re_c, Im_c, Re_d, Im_d, Re_h, Im_h);

        let p4 = produit(Re_g, Im_g, Re_e, Im_e, Re_c, Im_c);
        let p5 = produit(Re_h, Im_h, Re_f, Im_f, Re_a, Im_a);
        let p6 = produit(Re_i, Im_i, Re_d, Im_d, Re_b, Im_b);

        return [p1[0] + p2[0] + p3[0] - p4[0] - p5[0] - p6[0], p1[1] + p2[1] + p3[1] - p4[1] - p5[1] - p6[1]];
    }

    $("#submit-complexe").on("click", function(e){
        e.preventDefault(); //Empêche le rechargement de la page
        //Inputs

        results.text(""); //Réinitialisation du bloc de résultats
        rapport.text(""); //Réinitialisation du bloc de rapport

        var Re_a1 = parseFloat($("#Re-a1").val());
        var Im_a1 = parseFloat($("#Im-a1").val());
        var Re_b1 = parseFloat($("#Re-b1").val());
        var Im_b1 = parseFloat($("#Im-b1").val());
        var Re_c1 = parseFloat($("#Re-c1").val());
        var Im_c1 = parseFloat($("#Im-c1").val());
        var Re_d1 = parseFloat($("#Re-d1").val());
        var Im_d1 = parseFloat($("#Im-d1").val());       

        var Re_a2 = parseFloat($("#Re-a2").val());
        var Im_a2 = parseFloat($("#Im-a2").val());
        var Re_b2 = parseFloat($("#Re-b2").val());
        var Im_b2 = parseFloat($("#Im-b2").val());
        var Re_c2 = parseFloat($("#Re-c2").val());
        var Im_c2 = parseFloat($("#Im-c2").val());
        var Re_d2 = parseFloat($("#Re-d2").val());
        var Im_d2 = parseFloat($("#Im-d2").val());

        var Re_a3 = parseFloat($("#Re-a3").val());
        var Im_a3 = parseFloat($("#Im-a3").val());
        var Re_b3 = parseFloat($("#Re-b3").val());
        var Im_b3 = parseFloat($("#Im-b3").val());
        var Re_c3 = parseFloat($("#Re-c3").val());
        var Im_c3 = parseFloat($("#Im-c3").val());
        var Re_d3 = parseFloat($("#Re-d3").val());
        var Im_d3 = parseFloat($("#Im-d3").val());

        //Test si NaN
        if (isNaN(Re_a1) || isNaN(Im_a1) || isNaN(Re_b1) || isNaN(Im_b1) || isNaN(Re_c1) || isNaN(Im_c1) || isNaN(Re_d1) || isNaN(Im_d1) || isNaN(Re_a2) || isNaN(Im_a2) || isNaN(Re_b2) || isNaN(Im_b2) || isNaN(Re_c2) || isNaN(Im_c2) || isNaN(Re_d2) || isNaN(Im_d2) || isNaN(Re_a3) || isNaN(Im_a3) || isNaN(Re_b3) || isNaN(Im_b3) || isNaN(Re_c3) || isNaN(Im_c3) || isNaN(Re_d3) || isNaN(Im_d3)) {
            results.removeClass("bg-success");
            results.addClass("bg-danger");
            results.html("Veuillez ne saisir dans les champs que des valeurs numériques valides.");
            rapport.html("");
            message.hide();
            return;
        }

        //Déterminants
        var D = determinant_c(Re_a1, Im_a1, Re_b1, Im_b1, Re_c1, Im_c1, Re_a2, Im_a2, Re_b2, Im_b2, Re_c2, Im_c2, Re_a3, Im_a3, Re_b3, Im_b3, Re_c3, Im_c3);
        var Dx = determinant_c(Re_d1, Im_d1, Re_b1, Im_b1, Re_c1, Im_c1, Re_d2, Im_d2, Re_b2, Im_b2, Re_c2, Im_c2, Re_d3, Im_d3, Re_b3, Im_b3, Re_c3, Im_c3);
        var Dy = determinant_c(Re_a1, Im_a1, Re_d1, Im_d1, Re_c1, Im_c1, Re_a2, Im_a2, Re_d2, Im_d2, Re_c2, Im_c2, Re_a3, Im_a3, Re_d3, Im_d3, Re_c3, Im_c3);
        var Dz = determinant_c(Re_a1, Im_a1, Re_b1, Im_b1, Re_d1, Im_d1, Re_a2, Im_a2, Re_b2, Im_b2, Re_d2, Im_d2, Re_a3, Im_a3, Re_b3, Im_b3, Re_d3, Im_d3);

        //Résultats
        message.show(); //Afficher le message de rapport
        if (D[0] === 0 && D[1] === 0) {
            if (Dx[0] === 0 && Dx[1] === 0 && Dy[0] === 0 && Dy[1] === 0 && Dz[0] === 0 && Dz[1] === 0) {
                results.removeClass("bg-danger");
                results.addClass("bg-success");
                results.html("Il existe une infinité de solutions à ce système.");
                rapport.html("\\(\\Delta = 0 + 0i\\) et \\(\\Delta_x = \\Delta_y = \\Delta_z = 0 + 0i.\\) D'où l'infinité de solutions.");
                MathJax.typeset();
            } else {
                results.removeClass("bg-danger");
                results.addClass("bg-success");
                results.html("Ce système ne possède aucune solution.");
                rapport.html("\\(\\Delta = 0\\) et \\(\\Delta_x = " + Dx[0] + " + " + Dx[1] + "i, \\Delta_y = " + Dy[0] + " + " + Dx[1] + "i, \\Delta_z = " + Dz[0] + " + " + Dx[1] + "i.\\) D'où l'inexistence de solutions.");
                MathJax.typeset();
            }
        } else {
            let x = fraction(Dx[0], Dx[1], D[0], D[1]), y = fraction(Dy[0], Dy[1], D[0], D[1]), z = fraction(Dz[0], Dz[1], D[0], D[1]);
            results.removeClass("bg-danger");
            results.addClass("bg-success");

            if (x[1] >= 0) {
                results.append("\\(x = " + x[0] + "+" + x[1] + "i\\)<br>");
            }
            else {
                results.append("\\(x = " + x[0] + "" + x[1] + "i\\)<br>");
            }

            if (y[1] >= 0) {
                results.append("\\(y = " + y[0] + "+" + y[1] + "i\\)<br>");
            }
            else {
                results.append("\\(y = " + y[0] + "" + y[1] + "i\\)<br>");
            }

            if (z[1] >= 0) {
                results.append("\\(z = " + z[0] + "+" + z[1] + "i\\)<br>");
            }
            else {
                results.append("\\(z = " + z[0] + "" + z[1] + "i\\)<br>");
            }

            if (x[1] >= 0) rapport.append("\\(\\Delta_x = " + x[0] + "+" + x[1] + "i, \\)");
            else rapport.append("\\(\\Delta_x = " + x[0] + "" + x[1] + "i, \\)");

            if (y[1] >= 0) rapport.append("\\(\\Delta_y = " + y[0] + "+" + y[1] + "i, \\)");
            else rapport.append("\\( \\Delta_y = " + y[0] + "" + y[1] + "i, \\)");

            if (z[1] >= 0) rapport.append("\\(\\Delta_z = " + z[0] + "+" + z[1] + "i, \\) D'où l'existence de solutions.");
            else rapport.append("\\( \\Delta_z = " + z[0] + "" + z[1] + "i, \\) D'où l'existence de solutions.");

            MathJax.typeset();
        }
    });
});
