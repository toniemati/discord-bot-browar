import { MessageAttachment } from "discord.js";
import { database } from './firebase.js';

class Biba {

  constructor() {
    this.getBibas();
  }

  getBibas() {
    database.ref('bibas').once('value', (snap) => {
      this.bibas = snap.val();
    });
  }

  checkBiba(message) {
    const content = message.content;
    const text = content.split(/\s/);
    const command = text[1];
    const word = text[2];

    //* Exit if no biba command
    if (text[0] !== '!biba') return;

    //* Random photo
    if (!command) this.random(message);

    //* Add photo
    if (command && /^add$/.test(command)) this.add(message);

  }

  random(message) {
    const bibasLength = Object.keys(this.bibas).length;
    const randomIndex = Math.floor(Math.random() * (bibasLength - 0)) + 0;
    const ids = [];

    for (let prop in this.bibas) {
      ids.push(this.bibas[prop]);
    }

    const { src } = ids[randomIndex];
    const attachment = new MessageAttachment(src);

    message.channel.send(attachment);
  }

  add(message) {
    const text = message.content.split(/\s/);
    let word = [];

    text.forEach((w, idx) => {
      if (idx > 1) word.push(w);
    });

    word = word.toString().replace(/,/g, ' ');


    const id = '_' + Math.random().toString(36).substr(2, 9);

    const biba = {
      src: word,
      author: message.author.username,
      created: `${new Date()}`
    };

    database.ref(`bibas/${id}`).set(biba);

    this.getBibas();

    message.channel.send('Dodano nowe zdjęcie');
  }

}

export default Biba;