import { Router } from 'express'
import { res500 } from '@/src/configs/common-reses'

const depositRouter = Router()

depositRouter.post('/deposit', async (req, res) => {
    try {
        return res.send('aaaaaaaaaa')
    } catch (e) {
        console.log('In deposit route: ', e)
        res.status(500).send(res500)
    }
})

export { depositRouter }
