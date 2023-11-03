import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AppServer } from 'dth-core';
import MongoProvider from './includes/mongo';
import 'reflect-metadata'

import MainController from './modules/main.controller';
import SimController from './modules/sim/simController';
import OrderController from './modules/order/orderController';

(async () => {
  await MongoProvider.connect();
  const server = new AppServer({ debug: process.env.DEBUG === 'true' });
  server.imports([
    MainController,
    SimController,
    OrderController
  ]);
  server.run(<number><unknown>process.env.PORT || 6000)
})();
