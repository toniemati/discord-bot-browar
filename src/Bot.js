class Bot {

  checkBot(message) {
    const content = message.content;
    const text = content.split(/\s/);
    const command = text[1];
    const word = text[2];

    //* Exit if no pawel command
    if (text[0] !== '!bot') return;

    //* Exit if no command
    if (!command) return

    //* Show all comands
    if (command && /^cmd$/.test(command)) this.showAllCommands(message);
  }

  showAllCommands(message) {
    message.channel.send('Showing all commands...');
  }
}

export default Bot;