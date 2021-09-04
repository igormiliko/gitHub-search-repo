//Initializae the server and listen the port
process.title = "ServerListMarket"
    let args = process.argv
    let port = args[2] || 7070
    let webServer = require('./server')

webServer.listen(port, () => {
    console.log('Server start at port ' + port)
})