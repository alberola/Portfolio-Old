//Event listener to show hide more projects
$(".moreProjectsContainer").hide();
$("#showMoreProjects").click(function(){
    //aply the slide animation and change text
    if ($("#showMoreProjects").text() == "Show More ↘") {
        $(".moreProjectsContainer").slideDown(1000);
        $("#showMoreProjects").text("Show Less ↖");
    } else {
        //Redirect to the elemnt we want when we press show less
        $('html, body').animate({
            scrollTop: $(".firstContainer").offset().top
        }, 500);
        $(".moreProjectsContainer").slideUp(1000);
        $("#showMoreProjects").text("Show More ↘");
    }
});