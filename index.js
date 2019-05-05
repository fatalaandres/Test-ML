var express = require('express'),
    app     = express(),
    http    = require('http').Server(app),
    path    = require('path'),
    request = require('request');

app.get('*.*', express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res, next) => {
    var regex = /^\/(api)/g
    if ( regex.exec(req.originalUrl) ) next()
    else res.sendFile( path.join(__dirname, 'dist/index.html') )
})

app.use('/api', (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With','content-type','access-control-allow-origin','access-control-allow-methods','access-control-allow-headers');
    next()
})

app.get('/api/items',(req, res) =>{
    var q = req.query.q;
    if (!q) return res.json({'error':'No se recibió un ID'})
    fullReq(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)
    .then( uss => res.json(uss) )
    .catch( err => res.json({'error': err}) )
})

app.get('/api/items/:id',(req, res) =>{
    var id = req.params.id;
    var prod
    if (!id) return res.json({'error':'No se recibió un ID'})
    preq(`https://api.mercadolibre.com/items/${id}`)
    .then( uss => {
        prod = uss
        return preq(`https://api.mercadolibre.com/items/${id}/description`)
    })
    .then( uss => {
        prod.description_ml = uss
        return preq(`https://api.mercadolibre.com/categories/${prod.category_id}`)
    })
    .then( uss => {
        prod.category_ml = uss
        return res.json(prod)
    })
    .catch( err => res.json({'error': err}) )
})

var preq = url => new Promise( (uss, err) => {
    request( url, {json: true}, (error, resp) => {
        if (error) err(error)
        else uss(resp.body)
    })
})

/**
 * 
 * @param {String} url Url de la api a consultar
 */
async function fullReq( url ) {
    var res = await preq( url ),
        results = res.results
    for (const i in results) 
        results[i] = await preq(`https://api.mercadolibre.com/items/${results[i].id}`)
    return res
}

http.listen(80, () => console.log('Servidor iniciado'));