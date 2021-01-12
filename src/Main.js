import dotenv from 'dotenv';
import { Client, MessageFlags } from 'discord.js';
import Joke from './Joke.js';
import Bot from './Bot.js';
import Biba from './Biba.js';

import { beers } from '../beers.js';

dotenv.config();

const CLIENT = new Client();
const BOT = new Bot();
const JOKE = new Joke();
const BIBA = new Biba();

class Main {

  constructor() {
    CLIENT.login(process.env.BOT_TOKEN);
    this.init();
  }

  init() {
    CLIENT.on('ready', () => {
      console.log('Ima ready...');
    });

    CLIENT.on('message', (message) => {
      //* Check channel
      if (!this.checkChannel(message)) return;

      //* If bot return
      if (message.author.bot) return;

      //* check piwo
      this.checkPiwo(message);

      //* Chech if message contains 'robert'
      this.checkRobertWord(message);

      //* Check jokes command
      JOKE.checkJoke(message);

      //* Check bot command
      BOT.checkBot(message);

      //* Chech biba command
      BIBA.checkBiba(message);

      //* Auto delete message
      this.autoDelete(message);
    });

  }

  checkChannel(message) {
    const { channel: { id } } = message;

    //* 1 - test
    //* 2- piwo
    if (id !== '798496100856102922' && id !== '798498303859752960') return false;
    else return true;
  }

  checkPiwo(message) {
    const { content } = message;
    if (content === '!piwo') {
      message.react('🍺');

      const index = Math.floor(Math.random() * (beers.length - 0)) + 0;
      const beer = beers[index];

      message.channel.send(beer);
    }
  }

  autoDelete(message) {
    setTimeout(() => {
      message.channel.messages.fetch()
        .then((results) => {
          message.channel.bulkDelete(results);
        })
    }, 10000);
  }

  checkRobertWord(message) {
    let text = message.content.toLowerCase();

    if (/robert/.test(text)) {
      message.react('💩');
    }
  }

};

const main = new Main();
