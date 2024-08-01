import express from 'express'
import authMiddleware from '../middleware/oth.js'
import {placeOrder, userOrder, verifyOrder,listOrder, updateStatus, DeletItem} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorder', authMiddleware,userOrder)
orderRouter.get('/list',listOrder)
orderRouter.post('/status', updateStatus)
orderRouter.post('/delete',DeletItem)
export default orderRouter;