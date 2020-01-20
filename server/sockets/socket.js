const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let ticket = ticketControl.siguiente();
        callback(ticket);
        console.log('el siguiente ticket es' + ticket);
    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()

    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                messaje: 'el escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() })

        callback(atenderTicket);

    })
});