$(document).ready( function(){

    $('.hamburger').on('click', function(){
        $(this).toggleClass('is-active');
        $('header nav ul').toggleClass('is-active');
    })
})