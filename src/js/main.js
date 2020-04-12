$(document).ready(function () {

    $('#password2').keyup(function () { 
        var ps = $('#password').val();
        var ps2 = $('#password2').val();
        if(ps2 != ps){
            $('#password2').addClass('errinho');
        }else if(ps2 == ps){
            $('#password2').addClass('certo');
        }
    });

});

function expande(id){
    var iddiv = '#'+id;
    $(iddiv).toggle('blind', 600);
}