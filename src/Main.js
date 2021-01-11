import dotenv from 'dotenv';
import { Client } from 'discord.js';
import Joke from './Joke.js';
import Bot from './Bot.js';

dotenv.config();

const CLIENT = new Client();
const BOT = new Bot();
const JOKE = new Joke();

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
      if (message.author.bot) return;

      this.checkRobertWord(message);

      JOKE.checkJoke(message);
      BOT.checkBot(message);
    });

  }

  checkRobertWord(message) {
    let text = message.content.toLowerCase();

    if (/robert/.test(text)) {
      message.react('💩');
    }
  }

};

const main = new Main();
