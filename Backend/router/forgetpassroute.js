import express from 'express'
import { forgetpass } from '../controller/forgetpasscont.js';
const forgetpassroute=express.Router();


forgetpassroute.post("/password",forgetpass)

export default forgetpassroute