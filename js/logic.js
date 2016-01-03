$("#transform").click(function(event) {
    event.preventDefault();
    $("#result").html(sananmuunnos($("#pair").val()));
    $("#pair").select();
});