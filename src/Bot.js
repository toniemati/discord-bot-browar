import { MessageEmbed } from "discord.js";

const COMMANDS = [
  { command: '!bot cmd', description: 'Wszystkie dostępny komendy' },
  { command: '!pawel', description: 'Pokazuje losowy tekst' },
  { command: '!pawel all', description: 'Pokazuje wszystkie teksty' },
  { command: '!pawel add <text>', description: 'Dodaje <text> do listy tekstów' },
  { command: '!pawel remove <id>', description: 'Usuwa <id> z listy tekstów' }
];

class Bot {

  checkBot(message) {
    const content = message.content;
    const text = content.split(/\s/);
    const command = text[1];
    const word = text[2];

    //* Exit if no bot command
    if (text[0] !== '!bot') return;

    //* Exit if no command
    if (!command) return

    //* Show all comands
    if (command && /^cmd$/.test(command)) this.showAllCommands(message);
  }

  showAllCommands(message) {
    const embed = new MessageEmbed()
      .setTitle('Lista wszystkich komend')
      .setColor('RANDOM');

    COMMANDS.forEach(cmd => {
      embed.addField(cmd.command, cmd.description);
    });

    message.channel.send(embed);
  }
}

export default Bot;