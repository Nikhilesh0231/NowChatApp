import { Chat } from '../models/chat.js';
import { Message } from '../models/message.js';
import { User } from '../models/user.js'
import { faker, simpleFaker } from '@faker-js/faker';

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.lenght });
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.lenght);
        const randomUser = users[randomIndex];

        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatsPromise.push(chat);
    }
    await Promise.all(chatsPromise);
    console.log("Group Chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagesPromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagesPromise.push(
        Message.reate({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagesPromise);
    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
const createMessagesInAChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagesPromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      messagesPromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagesPromise);
    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error(error); 
    process.exit(1);
  }
}

export { createSingleChats, createGroupChats, createMessages, createMessagesInAChat } 