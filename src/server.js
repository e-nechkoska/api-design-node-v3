import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router();

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

router.get('/me', (req, res) => {
    res.send({me: 'hello'})
})

app.use('/api', router);

//cats
// const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id'];

// router.route('/cat')
//     .get()
//     .post()

// router.route('/cat/:id')
//     .get()
//     .put()
//     .delete()

const log = (req, res, next) => {
    console.log('logging');
    next();
}

//CRUD - Create(post), Read(get), Update(put), Destroy(delete)
app.get('/', (req, res, next) => {
    res.send({message: 'hello'})
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send({message: 'ok'})
})

app.get('/data', [log, log], (req, res) => {
    res.send({data: [1, 2, 3]})
})

app.post('/data', (req, res) => {
    res.send(req.body);
})

export const start = () => {
    app.listen(3000, () => {
        console.log('server is on 3000');
    })
}
