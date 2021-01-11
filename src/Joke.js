import { database } from './firebase.js';

class Joke {
  constructor() {
    this.getJokes();
  }

  getJokes() {
    database.ref('jokes').once('value', (snap) => {
      this.jokes = snap.val();
    });
  }

  checkJoke(message) {
    const content = message.content;
    const text = content.split(/\s/);
    const command = text[1];
    const word = text[2];

    //* Exit if no pawel command
    if (text[0] !== '!pawel') return;

    //* Random joke
    if (!command) this.random(message);

    //* All jokes
    if (command && /^all$/.test(command)) this.all(message);

    //* Add new joke
    if (command && /^add$/.test(command)) this.add(message);

    //* Remove joke
    if (command && /^remove$/.test(command) && word && /\d+/.test(word)) this.remove(message);
  }

  all(message) {
    console.log(this.jokes);

    message.channel.send('Writing all jokes...');
  }

  random(message) {
    const jokesLength = Object.keys(this.jokes).length;

    const randomIndex = Math.floor(Math.random() * (jokesLength - 0)) + 0;
    const ids = [];

    for (let prop in this.jokes) {
      ids.push(this.jokes[prop]);
    }

    const joke = ids[randomIndex];
    const { content } = joke;

    message.channel.send(content);
  }

  add(message) {
    const text = message.content.split(/\s/);
    let word = [];

    text.forEach((w, idx) => {
      if (idx > 1) word.push(w);
    });

    word = word.toString().replace(/,/g, ' ');


    const id = '_' + Math.random().toString(36).substr(2, 9);

    const joke = {
      content: word,
      author: message.author.username,
      created: `${new Date()}`
    };

    database.ref(`jokes/${id}`).set(joke);

    this.getJokes();

    message.channel.send('Dodano nowy tekscik');
  }

  remove(message) {
    const text = message.content.split(/\s/);
    const id = text[2];

    database.ref(`jokes`).child(id).remove();

    this.getJokes();

    message.send('Usunięto tekscik');
  }
}

export default Joke;

//! siema
//? siema
//todo siema
//* siema
//COPY* siema
