$(document).ready(function(){
    //Animation
    /**************************************************************************************************************************************************************/
    $(".item").hover(function(){
        $(this).css({
                "transform": "scale(1.001)",
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

    //Modification dynamique

    $("input").on("change", function() {

        let total = [];
        let somme = 0;

        for (let i = 1; i <= 10; i++) {
            let q = parseInt($("#q" + i).val()) || 0;
            let p = parseInt($("#p" + i).val()) || 0;
            if (p !== 0 && q !== 0) $("#m" + i).val(q * p);
            
            let prix = parseInt($("#p" + i).val()) || 0;
            total.push(prix);
        }

        let tableau = [];
        for (let i = 0; i < total.length; i++) {
            if (total[i] !== 0) tableau.push(total[i]);
        }

        for (let i = 0; i < tableau.length; i++) {
            somme += tableau[i];
        }

        //Calcul de la moyenne
        let moyenne = somme / tableau.length;
        if (!(isNaN(moyenne))) $("#prix-moyen").val(moyenne.toFixed(2));

        let min = tableau[0];
        let max = tableau[0];

        //Calcul du minimal
        for (let i = 0; i < tableau.length; i ++) {
            if (tableau[i] < min) min = tableau[i];
        }

        //Calcul du maximal
        for (let i = 0; i < tableau.length; i ++) {
            if (tableau[i] > max) max = tableau[i];
        }

        //Quantité et montant total
        let quantite_totale = 0, montant_total = 0;

        for (let i = 1; i <= 10; i++) {
            if (!(isNaN(parseInt($("#q" + i).val()))))
                quantite_totale += parseInt($("#q" + i).val());
            if (!(isNaN(parseInt($("#m" + i).val()))))
                montant_total += parseInt($("#m" + i).val());
        }

        //Affichage
        $("#prix-minimal").val(min);
        $("#prix-maximal").val(max);
        $("#quantite-totale").val(quantite_totale);
        $("#montant-total").val(montant_total);
    });

    //Graphique dynamique
    let graphe;

    $("input").on("change", function() {

        let ctx = $("#graphe");
        let minimal = $("#prix-minimal").val(), maximal = $("#prix-maximal").val(), moyen = $("#prix-moyen").val();

        if (graphe) graphe.destroy();

        graphe = new Chart(ctx, {
                type: 'bar',
                data: {
                labels: ["Prix"],
                datasets: [{
                    label: "Minimal",
                    data: [minimal],
                    backgroundColor: ["#ff6b6b"]
                },
                {
                    label: "Maximal",
                    data: [maximal],
                    backgroundColor: ["#66ff66"]
                },
                {
                    label: "Moyen",
                    data: [moyen],
                    backgroundColor: ["#66ffff"]
                }
            ]
            },
                options: {
                    scales: {
                        y: {
                        beginAtZero: true,
                        responsive: true
                    }
                }
            }   
        });
    });
});