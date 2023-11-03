import express, { Request } from 'express';
import cors from 'cors';
import { redis } from "../includes/redis";
import HelperService from '../includes/helper';
import { body } from "express-validator";
import { AppController } from 'dth-core';
import { Controller, Route } from 'dth-core/decorators';
import RequestInterceptors from '../middlewares/request-interceptors';

@Controller({
  prefix: '/',
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
    RequestInterceptors
  ]
})
export default class MainController extends AppController {

  // @Route('GET /')
  // index(req: Request) {
  //   const ip = (req.headers['x-forwarded-for'] as string || '').split(',').pop()?.trim() || req.socket.remoteAddress;
  //   // this.log.info(ip);

  //   return 'Simthanglong API Server!';
  // }

  // @Route("POST /del-cache", [
  //   body("link").notEmpty().withMessage("Link không được trống")
  // ])
  // async delCache(req: Request){
  //   const url = new URL(req.body.link.toString());
  //   const resultRedis = await HelperService.getKeyCache(url.pathname+url.search);
  //   return redis.del(resultRedis);
  // }

}