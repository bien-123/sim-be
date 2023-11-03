import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AppServer } from 'dth-core';
import MongoProvider from './includes/mongo';
import 'reflect-metadata'

import SimController from './modules/sim/simController';
import MainController from './modules/main.controller';

(async () => {
  await MongoProvider.connect();
  const server = new AppServer({ debug: process.env.DEBUG === 'true' });
  server.imports([
    MainController,
    SimController,
  ]);
  server.run(<number><unknown>process.env.PORT || 6000)
})();
