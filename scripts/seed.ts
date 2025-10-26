// To run this script: npm run seed

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env.local') });

import User from '../src/models/User';
import Event from '../src/models/Event';
import ContactMessage from '../src/models/ContactMessage';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || 'eventmaster';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const clearDB = async () => {
  console.log('Clearing the database...');
  await User.deleteMany({});
  await Event.deleteMany({});
  await ContactMessage.deleteMany({});
  console.log('Database cleared.');
};

const seedDB = async () => {
  try {
    await connectDB();
    await clearDB();

    console.log('Seeding data...');

    // 1. Create Demo User
    const hashedPassword = await bcrypt.hash('123456', 10);
    const demoUser = await User.create({
      name: 'Organizador Demo',
      email: 'demo@eventmaster.com',
      hashedPassword: hashedPassword,
      image: 'https://i.pravatar.cc/150?u=demo@eventmaster.com',
    });
    console.log('✔ Demo user created:');
    console.log('  Email: demo@eventmaster.com');
    console.log('  Password: 123456');

    // 2. Create Events for Demo User
    const today = new Date();
    const events = [
      {
        ownerId: demoUser._id,
        name: 'Conferência de Desenvolvedores 2024',
        date: new Date(today.getFullYear(), today.getMonth() + 1, 15),
        location: 'Centro de Convenções, São Paulo - SP',
        maxParticipants: 500,
        descriptionHtml: '<p>A maior conferência de desenvolvedores da América Latina. Palestras, workshops e muito networking!</p><h3>Destaques:</h3><ul><li>Trilha de Frontend com React e Next.js</li><li>Trilha de Backend com Node.js e Go</li><li>Palestra sobre Inteligência Artificial com experts da indústria</li></ul>',
      },
      {
        ownerId: demoUser._id,
        name: 'Workshop de Design UI/UX',
        date: new Date(today.getFullYear(), today.getMonth() + 2, 5),
        location: 'Online via Zoom',
        maxParticipants: 100,
        descriptionHtml: '<p>Aprenda na prática os fundamentos de design de interfaces e experiência do usuário com os melhores profissionais do mercado.</p>',
      },
      {
        ownerId: demoUser._id,
        name: 'Meetup Local de Tecnologia',
        date: new Date(today.getFullYear(), today.getMonth() + 3, 20),
        location: 'Coworking Hub, Rio de Janeiro - RJ',
        maxParticipants: 50,
        descriptionHtml: '<p>Um encontro casual para entusiastas de tecnologia. Venha compartilhar suas ideias e conhecer pessoas novas!</p>',
      },
    ];
    await Event.insertMany(events);
    console.log(`✔ ${events.length} events created.`);

    // 3. Create Contact Messages
    const messages = [
      {
        name: 'Ana Silva',
        email: 'ana.silva@example.com',
        message: 'Gostaria de saber se vocês oferecem planos para empresas. Adorei a plataforma!',
      },
      {
        name: 'Carlos Pereira',
        email: 'carlos.pereira@example.com',
        message: 'Encontrei um pequeno problema ao tentar editar um evento. O botão de salvar demorou a responder. Fora isso, tudo ótimo!',
      },
    ];
    await ContactMessage.insertMany(messages);
    console.log(`✔ ${messages.length} contact messages created.`);

    console.log('Seeding finished successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();
