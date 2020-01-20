var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al server');
})

socket.on('disconnect', function() {
    console.log('perdimos la conexión');
})

socket.on('estadoActual', function(data) {
    label.text(data.actual);
})

$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', {}, function(siguienteTicket) {

        label.text(siguienteTicket);
    })

})