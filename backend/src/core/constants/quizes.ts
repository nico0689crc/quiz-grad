import { TypeAnswer } from 'src/modules/questions/entities/question.entity';
import { Answer } from '../entities';

type AnswerType = {
  uuid: string;
  content: string;
  isCorrect: boolean;
};

type QuestionType = {
  uuid: string;
  title: string;
  description: string;
  secondsToDeliverAnswer: number;
  typeAnswer: TypeAnswer;
  answers: AnswerType[];
};

type QuizType = {
  uuid: string;
  title: string;
  description: string;
  numberOfPlayers: number;
  questions: QuestionType[];
};

export const quizes: QuizType[] = [
  {
    uuid: 'a7df54e6-c9b8-4f59-99e2-9bff72f5ad45',
    title: 'Cybersecurity Fundamentals Quiz',
    description:
      'Test your knowledge of cybersecurity fundamentals. This quiz covers topics such as password safety, malware, firewalls, and online best practices. Ideal for beginners looking to improve their understanding of online security.',
    numberOfPlayers: 10,
    questions: [
      {
        uuid: 'f1e4f9d9-b23f-4f25-bd60-5312f34b9a18',
        title: 'Password Safety',
        description: 'Which of the following is considered the most secure type of password?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '501cd3f0-2d9e-4f8b-90f2-d1f60b9c4f0b',
            content: '12345678',
            isCorrect: false,
          },
          {
            uuid: '36e4d9ab-2b9e-4d98-851b-8e5a89d4d649',
            content: 'Your birthdate',
            isCorrect: false,
          },
          {
            uuid: 'f27916e6-8a2b-488d-bb1f-45c78809bc6d',
            content: 'A mix of upper and lowercase letters, numbers, and symbols',
            isCorrect: true,
          },
          {
            uuid: '803e69a4-4d94-4e4a-8e5e-5091f982fcb8',
            content: 'Your pet’s name',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '27a4f4cf-d55c-4871-9273-6a96a65f514e',
        title: 'Types of Malware',
        description: 'Which of the following is NOT a type of malware?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'a7b329b4-5723-4e8f-bb32-123a6d6f26bc',
            content: 'Virus',
            isCorrect: false,
          },
          {
            uuid: 'df1d6a7a-19f8-4c53-9f3a-49f2d504b2b4',
            content: 'Trojan',
            isCorrect: false,
          },
          {
            uuid: 'f94e6d28-f0d8-442d-8b2a-5bf45a9c144b',
            content: 'Firewall',
            isCorrect: true,
          },
          {
            uuid: 'c1b2e8a1-5b98-45f9-9e39-1bde91c7525b',
            content: 'Spyware',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'ba5f541b-b4fc-4418-b5d9-81f5d45e3fc3',
        title: 'Phishing',
        description: 'Phishing attacks typically try to steal:',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'c3e5f5cd-1a6f-4f87-9984-5f9b0c9a09cb',
            content: 'Personal information like passwords and credit card numbers',
            isCorrect: true,
          },
          {
            uuid: 'd598f44b-1ed4-4dc9-92cd-12a37d5a16dc',
            content: 'Your social media followers',
            isCorrect: false,
          },
          {
            uuid: 'f9cdcd53-56b5-4e10-8c24-b0b7c74c5cb8',
            content: 'Your computer hardware',
            isCorrect: false,
          },
          {
            uuid: '34d89d9b-6a6c-4882-a9b9-3c3a839c25e5',
            content: 'Your browsing history',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '1576e56e-2ad3-4a36-8a3f-bc75c3a0ac9c',
        title: 'Firewalls',
        description: 'What is the purpose of a firewall?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'b1f79a85-6f7c-49fc-941d-35d0135654de',
            content: 'To detect and remove viruses',
            isCorrect: false,
          },
          {
            uuid: 'b5fbc82f-6b7e-4f5f-9d82-fde1d3b527cc',
            content: 'To block unauthorized access to your network',
            isCorrect: true,
          },
          {
            uuid: 'f6d33f4f-4635-49b9-bb3d-b12398652b4e',
            content: 'To monitor your internet browsing history',
            isCorrect: false,
          },
          {
            uuid: '7511ad5f-0d3d-4b2b-bc1e-126b6f95ab07',
            content: 'To store your passwords securely',
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    uuid: 'b8d4df76-956b-4a9e-b269-7549bc5b6d89',
    title: 'Cybersecurity Awareness Quiz',
    description:
      'This quiz is designed to enhance your awareness of key cybersecurity threats and best practices. Covering areas like social engineering, secure connections, and data protection, it’s a great way to strengthen your online security skills.',
    numberOfPlayers: 12,
    questions: [
      {
        uuid: 'c72b9b89-2d89-453f-9bc7-cfc5bb7a4b89',
        title: 'Social Engineering',
        description: 'What is social engineering in the context of cybersecurity?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '432e5c48-d9f1-40c7-83b3-abb5d45f5312',
            content: 'A method to build secure networks',
            isCorrect: false,
          },
          {
            uuid: 'b48206ad-d871-4c8c-9440-b97d24423bc7',
            content: 'A strategy for designing software interfaces',
            isCorrect: false,
          },
          {
            uuid: '3cf2292d-936f-4be5-bf97-682342736f13',
            content: 'Manipulating individuals into giving up confidential information',
            isCorrect: true,
          },
          {
            uuid: '9340c619-6791-490e-89a1-04819cf4b34f',
            content: 'A type of hardware malfunction',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'd82fe91a-6c9d-48a2-bb3e-5835d9e3f42d',
        title: 'Two-Factor Authentication',
        description: 'What is the main benefit of two-factor authentication (2FA)?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '6f4f676d-1f72-4144-823a-d5ff9e14f91a',
            content: 'It helps prevent phishing attacks',
            isCorrect: false,
          },
          {
            uuid: '1f27ae0d-93f2-4e7d-bd4d-dcd6c30a2f44',
            content: 'It adds an extra layer of security by requiring two forms of verification',
            isCorrect: true,
          },
          {
            uuid: '58b59484-b80a-4a8e-b0a5-c529e4c2285b',
            content: 'It automatically changes your password monthly',
            isCorrect: false,
          },
          {
            uuid: '06f1bb18-ef33-4c0d-85a9-3bf78a4db03e',
            content: 'It ensures encrypted communication between devices',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'f4b71d4c-695f-4cb9-b2b2-6b9fdcf074bb',
        title: 'VPNs',
        description: 'What does a VPN (Virtual Private Network) primarily do?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '75bdfaec-e5c6-44a2-8d16-8ed9d239e2fe',
            content: 'Blocks ads on websites',
            isCorrect: false,
          },
          {
            uuid: 'b18a1dfd-6276-4297-9885-2d5d7af9bc85',
            content: 'Encrypts your internet connection for added privacy',
            isCorrect: true,
          },
          {
            uuid: '20a81a6e-12f5-4891-b2ea-4c7c4f9b2b48',
            content: 'Provides free internet access',
            isCorrect: false,
          },
          {
            uuid: 'bdbf3b36-4f0b-4049-8d11-bbdf5d501acd',
            content: 'Repairs your computer’s hardware',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'ea15c4bb-2918-4ed5-a9eb-2d7b217fd2b5',
        title: 'Data Protection',
        description: 'Which of the following is the best way to protect sensitive data?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '536b0db7-f780-44e5-bb36-8fd1e8b94fdd',
            content: 'Store it on a local device with no backup',
            isCorrect: false,
          },
          {
            uuid: 'c58b15d2-452e-4bcb-9391-7304bc72f0cd',
            content: 'Use encryption and strong access controls',
            isCorrect: true,
          },
          {
            uuid: 'b2fe9e3f-8a64-4bfc-8569-32d41b68db52',
            content: 'Email it to yourself',
            isCorrect: false,
          },
          {
            uuid: '7fe67245-e59a-4d91-81ba-0e28355c0844',
            content: 'Upload it to a public cloud service without encryption',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'History Buff Quiz',
    description:
      "Put your history knowledge to the test with this engaging quiz! Explore various historical events, figures, and civilizations as you answer a series of challenging questions. From ancient civilizations to modern revolutions, this quiz covers a wide range of historical topics. Whether you're a history enthusiast or just looking to learn something new, this quiz is sure to challenge and entertain you!",
    uuid: 'eb7cb54e-84b4-5706-9ca7-7ff1e28f600d',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: 'c2e8cb8d-14a0-53ef-813d-87b8e4151590',
        title: 'Ancient Civilization Trivia',
        description: 'Which ancient civilization is known for building the Great Pyramids of Giza?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'cc222262-2c1f-502e-8025-40157dd2c1a6',
            content: 'Ancient Egypt',
            isCorrect: true,
          },
          {
            uuid: '7532170c-4340-59ac-9a43-ac62c1223ad0',
            content: 'Ancient Greece',
            isCorrect: false,
          },
          {
            uuid: '9aae535b-230c-577e-a149-2d254342a1c5',
            content: 'Roman Empire',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '8bf1ca52-ec33-5a59-a076-f4f926eac726',
        title: 'World War II Knowledge',
        description: 'Who was the Prime Minister of the United Kingdom during World War II?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.MULTIPLE_ANSWERS,
        answers: [
          {
            uuid: '0974aaac-fe88-5bea-9dcd-dd9ff6ad1550',
            content: 'Winston Churchill',
            isCorrect: true,
          },
          {
            uuid: '94903dd3-e0ab-5197-8e8f-5c37de5248a8',
            content: 'Franklin D. Roosevelt',
            isCorrect: false,
          },
          {
            uuid: 'b8c40d1a-a1ab-539d-abee-418874646ba9',
            content: 'Joseph Stalin',
            isCorrect: true,
          },
          {
            uuid: 'c62c83d0-e57d-55a0-a6a9-f86871350153',
            content: 'Adolf Hitler',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '06614b8a-dd73-5996-bb08-ccf6dbc7a69e',
        title: 'Famous Scientists',
        description: 'Who is credited with discovering the theory of general relativity?',
        secondsToDeliverAnswer: 20,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '971ee276-4607-505c-826e-7208f7a57775',
            content: 'Isaac Newton',
            isCorrect: false,
          },
          {
            uuid: '29110c43-c227-5c7e-ae3e-5435b8ae5962',
            content: 'Albert Einstein',
            isCorrect: true,
          },
          {
            uuid: 'cca52170-f8f3-5b29-ad43-73e0b8a14fc4',
            content: 'Galileo Galilei',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '650fad19-b676-5687-a400-5f278814e45b',
        title: 'Space Exploration',
        description: 'Which year did humans first land on the moon?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '325616d9-c7e5-5d8f-b0ee-759dba7de7d6',
            content: '1969',
            isCorrect: true,
          },
          {
            uuid: 'b55a0bd2-b83d-5f75-867f-4b8ac228408b',
            content: '1954',
            isCorrect: false,
          },
          {
            uuid: '5472172e-1fa5-533e-8acf-1148c7371f36',
            content: '1973',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '3e0b780e-4077-5bff-b232-9738ad507cf1',
        title: 'Literature',
        description: "Who wrote 'To Kill a Mockingbird'?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'df24634c-6df0-59b1-baa6-d9cdb8a33ac5',
            content: 'Harper Lee',
            isCorrect: true,
          },
          {
            uuid: '21b91307-38b0-54aa-b02e-49950b95555d',
            content: 'John Steinbeck',
            isCorrect: false,
          },
          {
            uuid: '3285cc80-51ba-5695-b6a6-241ef34a0f75',
            content: 'F. Scott Fitzgerald',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'd21b0a3e-6fb3-5f82-bff8-c62b869db482',
        title: 'Geography',
        description: 'Which river is the longest in the world?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'c0e762fd-a1ab-51d1-9703-3b1b1afed6c8',
            content: 'Nile',
            isCorrect: true,
          },
          {
            uuid: '11cb9566-e289-5821-aaaa-37fdb6702170',
            content: 'Amazon',
            isCorrect: false,
          },
          {
            uuid: '5d96b38d-1401-58e7-9a93-8175566c5a41',
            content: 'Mississippi',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '99e04818-29df-5d87-8bc6-a8fde7d32b84',
        title: 'Music',
        description: "Who is known as the 'King of Pop'?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '84e38543-0a24-57d9-8a93-65749ea7b2dd',
            content: 'Michael Jackson',
            isCorrect: true,
          },
          {
            uuid: '2f49c69f-e4d8-5ae6-a656-43801ae003e6',
            content: 'Elvis Presley',
            isCorrect: false,
          },
          {
            uuid: 'bde462d0-77d9-5058-af39-11bdcc28dddf',
            content: 'Frank Sinatra',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Science Quiz',
    description:
      "Test your knowledge about various scientific disciplines with this exciting quiz! From biology to physics, this quiz covers a wide range of scientific topics. Whether you're a science enthusiast or just curious about the world around you, this quiz is sure to challenge and entertain you!",
    uuid: '5ccaa61d-2e37-554c-a0b3-f921a50d411b',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: 'b719b124-d8a5-559a-ab56-ed61c2685e5c',
        title: 'Biology',
        description: 'What is the powerhouse of the cell?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '21c35f50-f49d-5b87-9e8f-0c44d8bfc7ae',
            content: 'Mitochondria',
            isCorrect: true,
          },
          {
            uuid: '0515cabd-abd2-5f39-83cd-d94940e1dde2',
            content: 'Ribosome',
            isCorrect: false,
          },
          {
            uuid: 'cebff93a-a673-5e98-8f72-6bce5ef02406',
            content: 'Nucleus',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'bd6334ef-fbbb-5d84-b15a-1394e0911458',
        title: 'Physics',
        description: 'What is the unit of measurement for force?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '02e7ef6f-fdf9-5ec9-876c-881f1ae566d7',
            content: 'Newton',
            isCorrect: true,
          },
          {
            uuid: '0e7bff2d-82e8-56c0-9aa1-1ea554da6ee3',
            content: 'Watt',
            isCorrect: false,
          },
          {
            uuid: 'a51ac5c8-8f9d-5bce-b832-8c86d560c35e',
            content: 'Joule',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '7bf095e9-7978-5179-8661-cf68008ac010',
        title: 'Chemistry',
        description: 'What is the chemical symbol for gold?',
        secondsToDeliverAnswer: 20,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '8db75f3d-37cc-569e-a9e5-074067a55f4c',
            content: 'Au',
            isCorrect: true,
          },
          {
            uuid: '5d73ef58-f2ef-5913-8336-34eb8f5c1594',
            content: 'Ag',
            isCorrect: false,
          },
          {
            uuid: '1dde7875-f583-5f3d-95ac-e26ec2eb6424',
            content: 'Pt',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'f0d6f00f-8378-5e93-82f8-92608e72bbb9',
        title: 'Astronomy',
        description: 'What is the largest planet in our solar system?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '7e8d2473-e74c-5858-bc36-be770c28649c',
            content: 'Jupiter',
            isCorrect: true,
          },
          {
            uuid: '6372e302-dd06-5149-847f-9392846bffaa',
            content: 'Saturn',
            isCorrect: false,
          },
          {
            uuid: '0357d547-931f-528e-84bc-94b912320cc0',
            content: 'Neptune',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'f60c8864-87da-590c-8807-c2c93eae7d22',
        title: 'Geology',
        description: 'What is the hardest natural substance on Earth?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'fa7e5233-1d3d-595a-a26c-dedb1e216065',
            content: 'Diamond',
            isCorrect: true,
          },
          {
            uuid: '5823e2cb-a846-5011-bd1d-8a97b11881f1',
            content: 'Quartz',
            isCorrect: false,
          },
          {
            uuid: 'b15aa376-f016-50d1-96ec-21d196faec8a',
            content: 'Corundum',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'd5f98c79-ec2f-530a-bccf-e3a76cd9d3fa',
        title: 'Ecology',
        description: "Which gas is most abundant in Earth's atmosphere?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '67da6d14-bf0d-52ae-a069-263829e24932',
            content: 'Nitrogen',
            isCorrect: true,
          },
          {
            uuid: '1be17745-2533-5927-8eb6-6dbbd6dd447b',
            content: 'Oxygen',
            isCorrect: false,
          },
          {
            uuid: 'ce508916-9833-5b77-9b78-f84aa6293848',
            content: 'Carbon Dioxide',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'b7a82004-19f3-5943-a70d-bf959c39fe50',
        title: 'Medicine',
        description: 'What is the smallest bone in the human body?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '2be70114-99c1-5459-912c-5f240e5f88e3',
            content: 'Stapes',
            isCorrect: true,
          },
          {
            uuid: '4e92f5f4-9b20-51f1-951b-1e1802544f8d',
            content: 'Femur',
            isCorrect: false,
          },
          {
            uuid: 'ac7b8b07-1719-5ca6-b3b1-935982d77f66',
            content: 'Tibia',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'b53b952f-a864-58c6-b86b-e7b7a4e51103',
        title: 'Technology',
        description: 'Which programming language is often used for web development?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'd1abde7f-97ab-5268-a27f-4b37bfadc109',
            content: 'JavaScript',
            isCorrect: true,
          },
          {
            uuid: 'b471dca3-b658-5467-b2d6-6a35841f6ca9',
            content: 'Python',
            isCorrect: false,
          },
          {
            uuid: '4c851d31-88c4-5fcc-80b3-81eba934768b',
            content: 'Java',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Movie Trivia Quiz',
    description:
      "Test your knowledge of popular movies with this exciting quiz! From classic films to recent blockbusters, this quiz covers a wide range of cinematic trivia. Whether you're a movie buff or just love a good film, this quiz is sure to challenge and entertain you!",
    uuid: '84243bb6-09b7-55e1-94b6-ee807ce8e041',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: '80ee4dda-5f3d-5899-9ce1-7753310828dd',
        title: 'Classic Movies',
        description: "Who directed the movie 'The Godfather'?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '8a802ddd-9fbd-57ce-bee3-4d7e4673b4c7',
            content: 'Francis Ford Coppola',
            isCorrect: true,
          },
          {
            uuid: '38b0468c-4a91-5372-b819-9b75e5a598f6',
            content: 'Martin Scorsese',
            isCorrect: false,
          },
          {
            uuid: 'd8d8d95b-524a-5d97-b6cf-f5c3abe5312f',
            content: 'Alfred Hitchcock',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '1da08a6e-a34b-5a8e-84db-a211eed9a981',
        title: 'Recent Blockbusters',
        description: 'Which actor played the role of Iron Man in the Marvel Cinematic Universe?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '7a7ca478-e5f0-5165-9804-b019f3ae2aed',
            content: 'Robert Downey Jr.',
            isCorrect: true,
          },
          {
            uuid: 'eddd6f56-a186-5fca-bec3-fdc08de7335e',
            content: 'Chris Evans',
            isCorrect: false,
          },
          {
            uuid: 'a1ffa605-fb45-5259-be42-1ed59b6e6167',
            content: 'Chris Hemsworth',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '2e86dc18-1b82-5e58-90c2-a688851cbb51',
        title: 'Animated Films',
        description: "Which Disney animated movie features the song 'Let It Go'?",
        secondsToDeliverAnswer: 20,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'a4fefcb0-9e5f-538d-b95e-6b94355d137e',
            content: 'Frozen',
            isCorrect: true,
          },
          {
            uuid: '158a403c-e8cf-574e-851e-4e76da37e208',
            content: 'Moana',
            isCorrect: false,
          },
          {
            uuid: 'ac42f719-c8fb-5936-9d30-e4fcd64deb85',
            content: 'The Lion King',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '14a84081-55cc-50ba-be20-665379ec5a24',
        title: 'Sci-Fi Movies',
        description: 'Which movie features a time-traveling DeLorean?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '6b881174-a5bf-5bd0-8bde-5f9d861e0e77',
            content: 'Back to the Future',
            isCorrect: true,
          },
          {
            uuid: '1f351b86-bf5f-51bf-9742-17964c909bc5',
            content: 'The Terminator',
            isCorrect: false,
          },
          {
            uuid: '772d55f7-bc3c-5310-bbda-24921a7048e3',
            content: 'Interstellar',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'a1cc80ab-c9e8-5c1b-8442-f88f1cd600e7',
        title: 'Comedy Films',
        description: "Which actor plays the character of Michael Scott in the TV series 'The Office'?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '84af74de-b729-50a0-86d7-b4cdeb897484',
            content: 'Steve Carell',
            isCorrect: true,
          },
          {
            uuid: 'a6ea06a5-1213-5e38-b49a-e4878b090a7e',
            content: 'Will Ferrell',
            isCorrect: false,
          },
          {
            uuid: '355ac43c-2df5-5a19-acdc-281eea6aaa2d',
            content: 'Jim Carrey',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'e38ee6dc-1e1c-59ca-85d9-8158a9eb62c3',
        title: 'Horror Movies',
        description: 'Which horror movie features a possessed doll named Annabelle?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '5a50cf30-d40a-5fd9-9ee0-3c352e388aad',
            content: 'Annabelle',
            isCorrect: true,
          },
          {
            uuid: '22d13669-520d-5a05-adcc-e968fbe2a1f7',
            content: 'The Conjuring',
            isCorrect: false,
          },
          {
            uuid: '90450d85-1c6d-582b-897b-a69fd85b2e30',
            content: 'The Exorcist',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '5b843164-7aee-568f-91bb-9da7c01b6340',
        title: 'Action Movies',
        description: "Who directed the movie 'The Dark Knight'?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'da735522-c863-57d9-8eb2-c6a1bd984bc7',
            content: 'Christopher Nolan',
            isCorrect: true,
          },
          {
            uuid: '9148ebe2-635a-582a-b33e-6f88af8d0c16',
            content: 'Michael Bay',
            isCorrect: false,
          },
          {
            uuid: '5bc70eac-af73-569c-8d4a-2c40255d6107',
            content: 'Zack Snyder',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Geography Quiz',
    description:
      "Test your knowledge of world geography with this challenging quiz! From continents to capitals, this quiz covers a wide range of geographical topics. Whether you're a seasoned traveler or just curious about the world, this quiz is sure to challenge and entertain you!",
    uuid: 'ba2c1c33-b736-5056-93d6-abda83d2fba6',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: '27d7cb91-892d-51b2-bdbe-33892d057cfc',
        title: 'World Capitals',
        description: 'What is the capital of France?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '2f36a1a0-5081-5ec5-b9e1-63f4d55c1623',
            content: 'Paris',
            isCorrect: true,
          },
          {
            uuid: 'ebada2ed-e294-5c86-a9d8-81205d0ece07',
            content: 'Rome',
            isCorrect: false,
          },
          {
            uuid: '8f09b08d-763a-5189-b84d-5b2178f7737f',
            content: 'Berlin',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '491f6d2e-9c41-5237-af9b-2cb51a63f463',
        title: 'Famous Landmarks',
        description: 'Which landmark is located in India and considered one of the New Seven Wonders of the World?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '17614242-30af-57a0-9da5-200c4051595b',
            content: 'Taj Mahal',
            isCorrect: true,
          },
          {
            uuid: 'cf705c6a-b9b1-5446-acfb-59c1264f8c9b',
            content: 'Eiffel Tower',
            isCorrect: false,
          },
          {
            uuid: '019bd303-93b6-51f3-8ca8-95c41f8a525e',
            content: 'Great Wall of China',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'd3bba762-adb0-51d2-8436-f4137b2f324c',
        title: 'Continents',
        description: 'Which continent is the largest by land area?',
        secondsToDeliverAnswer: 20,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'cf9ec065-baad-5a19-b98b-059ddba78af5',
            content: 'Asia',
            isCorrect: true,
          },
          {
            uuid: '955a9b99-1a3e-58de-a11a-05ace156387b',
            content: 'Africa',
            isCorrect: false,
          },
          {
            uuid: '21a1e287-18f1-5dce-8e00-9bff370ac478',
            content: 'North America',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '65d9d6c9-9173-559e-a610-a845109e21b7',
        title: 'Mountain Ranges',
        description: 'Which mountain range stretches across several countries in Europe and is home to the Matterhorn peak?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'c914e7d8-69f0-54e0-966c-d8d3e3c4e13f',
            content: 'The Alps',
            isCorrect: true,
          },
          {
            uuid: '181d26fe-9b5c-516b-99ac-9ce017975527',
            content: 'The Andes',
            isCorrect: false,
          },
          {
            uuid: '1e127573-71c3-54cc-bd27-1036f7e0a24a',
            content: 'The Rockies',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '5c2d9a5d-f0b9-5fbb-8e57-a809c9aaf734',
        title: 'Oceans',
        description: 'Which ocean is the largest and deepest on Earth?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'e4f4d275-bd00-5b2b-b285-4122e6a63332',
            content: 'Pacific Ocean',
            isCorrect: true,
          },
          {
            uuid: '825a1076-69c0-57ab-a5cf-a6b8c4cd6a3f',
            content: 'Atlantic Ocean',
            isCorrect: false,
          },
          {
            uuid: 'd0220542-a406-5e5b-aea2-ce935c16a31b',
            content: 'Indian Ocean',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'History Quiz',
    description:
      "Test your knowledge of historical events with this engaging quiz! From ancient civilizations to modern history, this quiz covers a wide range of historical topics. Whether you're a history buff or just curious about the past, this quiz is sure to challenge and entertain you!",
    uuid: 'e0722dab-e1ce-5e4a-a3a8-b4a627641471',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: '47f4a293-3417-59b3-8913-65f2182d640b',
        title: 'Ancient Civilizations',
        description: 'Which ancient civilization built the pyramids of Giza?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'd35148eb-cd85-58d2-b0d2-724c5f1f08a4',
            content: 'Ancient Egyptians',
            isCorrect: true,
          },
          {
            uuid: '0677fa3e-efef-5ec6-a434-1875504fad38',
            content: 'Ancient Greeks',
            isCorrect: false,
          },
          {
            uuid: '513905e0-2ea9-5fff-bb55-a786f7cae604',
            content: 'Ancient Romans',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '033199bc-825d-5a13-817b-a49f36f0b634',
        title: 'World Wars',
        description: 'In which year did World War II end?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'a6e95696-7cff-53fe-ac51-fa4310fe7ac4',
            content: '1945',
            isCorrect: true,
          },
          {
            uuid: '67485118-c40c-55ab-a408-b31774625ae6',
            content: '1939',
            isCorrect: false,
          },
          {
            uuid: 'c4e80f9f-68d7-51ef-8366-d428ab139cde',
            content: '1918',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Sports Quiz',
    description:
      "Test your knowledge of sports with this exciting quiz! From football to basketball, this quiz covers a wide range of sporting events and athletes. Whether you're a sports fanatic or just enjoy watching games, this quiz is sure to challenge and entertain you!",
    uuid: '0759daa4-c4f3-55cb-b140-9e7e557647b4',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: 'aec3936d-2544-5394-8e8a-56053bfcf30f',
        title: 'Football',
        description: 'Which country won the FIFA World Cup in 2018?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '7db5fff9-dfca-5834-b622-39fb21bba083',
            content: 'France',
            isCorrect: true,
          },
          {
            uuid: '33f15da3-8d0b-5a64-84f3-b43a3c202e82',
            content: 'Brazil',
            isCorrect: false,
          },
          {
            uuid: '3f3f05e0-0b83-50ac-8c16-0e4444f8193f',
            content: 'Germany',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '9d1e7608-0d8f-5a71-99bc-36f9d40a5254',
        title: 'Basketball',
        description: "Which NBA player is known as 'The King'?",
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '2130f23a-5243-5bfa-82f0-628d20f493ec',
            content: 'LeBron James',
            isCorrect: true,
          },
          {
            uuid: 'd9549f2c-0583-50ab-9d26-479f6a3c42a6',
            content: 'Michael Jordan',
            isCorrect: false,
          },
          {
            uuid: 'bd5c9e56-c9bf-5a1d-9704-356e00577858',
            content: 'Kobe Bryant',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'History Quiz',
    description:
      "Test your knowledge of historical events with this engaging quiz! From ancient civilizations to modern history, this quiz covers a wide range of historical topics. Whether you're a history buff or just curious about the past, this quiz is sure to challenge and entertain you!",
    uuid: '26e2e840-3d3f-58d7-9c44-7d241cee2cf3',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: 'dedfc1d1-58ee-507a-b842-e2c99683258a',
        title: 'Ancient Civilizations',
        description: 'Which ancient civilization built the pyramids of Giza?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'e2685159-95c3-5920-8110-fa3ecd1c8f53',
            content: 'Ancient Egyptians',
            isCorrect: true,
          },
          {
            uuid: '57a50bd0-1dcf-54eb-bae5-0554eca54b7b',
            content: 'Ancient Greeks',
            isCorrect: false,
          },
          {
            uuid: '3cc4ea62-adbf-5211-9df4-c8eb88c45422',
            content: 'Ancient Romans',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '5f3a89e3-ba28-53fc-bd1b-e71332da8248',
        title: 'World Wars',
        description: 'In which year did World War II end?',
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '67ea8e27-9236-5fc6-91f1-5b702b31af03',
            content: '1945',
            isCorrect: true,
          },
          {
            uuid: 'a9747a71-a1ae-5038-b3ed-bbde9a7055ef',
            content: '1939',
            isCorrect: false,
          },
          {
            uuid: '30da1fc4-096c-5e82-9d0c-7834ef2fdd81',
            content: '1918',
            isCorrect: false,
          },
        ],
      },

      {
        uuid: '2cd0886b-cfec-5b58-a439-9de290d28eb2',
        title: 'American Revolution',
        description: "Which document outlined the original thirteen American colonies' grievances against the British monarchy?",
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'cd532d46-9a27-50af-888b-dd81bd306d15',
            content: 'Declaration of Independence',
            isCorrect: true,
          },
          {
            uuid: 'b92d0e72-8a8e-5171-8d84-2976d80a2477',
            content: 'Constitution',
            isCorrect: false,
          },
          {
            uuid: 'd8c2269e-7c4b-5465-944a-07a7d2e79171',
            content: 'Bill of Rights',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'f62a8718-71e6-5d7d-a3b6-b554c930c4a4',
        title: 'Renaissance',
        description: 'Which Italian city was the center of the Renaissance?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '16cfe8ee-c216-5c98-825d-06cbccf78fdc',
            content: 'Florence',
            isCorrect: true,
          },
          {
            uuid: '955dd661-a15b-588f-96fb-d6409f02a19e',
            content: 'Venice',
            isCorrect: false,
          },
          {
            uuid: '7af13b01-f8f2-5dcd-9617-8b4df026400a',
            content: 'Rome',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '7594f9df-2d9c-5337-a47e-41ab490300b6',
        title: 'Industrial Revolution',
        description: 'Which invention is often credited with kickstarting the Industrial Revolution?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '6bd8d8ce-35b2-51f6-a1d1-0dba58c06d72',
            content: 'Steam Engine',
            isCorrect: true,
          },
          {
            uuid: '857a0a48-cc36-5830-b4e9-110999fcf133',
            content: 'Electric Light Bulb',
            isCorrect: false,
          },
          {
            uuid: 'dd391243-1309-5afd-8b26-a7d372622eef',
            content: 'Telephone',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Sports Quiz',
    description:
      "Test your knowledge of sports with this exciting quiz! From football to basketball, this quiz covers a wide range of sporting events and athletes. Whether you're a sports fanatic or just enjoy watching games, this quiz is sure to challenge and entertain you!",
    uuid: '25b640d4-8166-5575-ab22-c748d967e3bf',
    numberOfPlayers: 8,
    questions: [
      {
        uuid: '46fda474-1a12-568e-99d1-5c2d12d322c0',
        title: 'Football',
        description: 'Which country won the FIFA World Cup in 2018?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'e3047368-8c68-56c8-9aa4-cfad69bb771e',
            content: 'France',
            isCorrect: true,
          },
          {
            uuid: '63ef7ae3-6b1e-5f45-b913-ef28e4108288',
            content: 'Brazil',
            isCorrect: false,
          },
          {
            uuid: '09ec12b6-db6e-573f-a10d-6a1269cc3357',
            content: 'Germany',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '3d042762-74c9-5dda-8217-747907798b6d',
        title: 'Basketball',
        description: "Which NBA player is known as 'The King'?",
        secondsToDeliverAnswer: 45,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '84240c86-3a33-5b2d-a417-b9fc1a534789',
            content: 'LeBron James',
            isCorrect: true,
          },
          {
            uuid: 'c139bf29-5865-54ba-9a43-a181a5616255',
            content: 'Michael Jordan',
            isCorrect: false,
          },
          {
            uuid: 'c216a660-678e-5d35-a883-dbb604c40e97',
            content: 'Kobe Bryant',
            isCorrect: false,
          },
        ],
      },

      {
        uuid: '44228779-2410-52a2-8ed2-14f5508932e9',
        title: 'Tennis',
        description: 'Who holds the record for the most Grand Slam singles titles in tennis?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'd1fcaaf8-f076-5aa9-8352-099039862086',
            content: 'Roger Federer',
            isCorrect: true,
          },
          {
            uuid: '594d738d-0c00-5898-a772-84c2159c9766',
            content: 'Rafael Nadal',
            isCorrect: false,
          },
          {
            uuid: '650e2efb-03cd-5eda-9e8f-09cc52a4905f',
            content: 'Novak Djokovic',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: '3d1b29c9-4499-5489-ac42-9bb1741ef86e',
        title: 'Golf',
        description: 'Which golfer has won the most major championships?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: '9d0aec93-9c69-59e6-bf95-553447535802',
            content: 'Jack Nicklaus',
            isCorrect: true,
          },
          {
            uuid: 'd131130b-9cd3-50de-b511-f34d5935da14',
            content: 'Tiger Woods',
            isCorrect: false,
          },
          {
            uuid: '24b96e24-d5f3-5a09-87ca-522bd472a277',
            content: 'Arnold Palmer',
            isCorrect: false,
          },
        ],
      },
      {
        uuid: 'fce4aeab-25d9-5082-8214-0a2c2eed55e1',
        title: 'Olympics',
        description: 'Which city hosted the first modern Olympic Games in 1896?',
        secondsToDeliverAnswer: 30,
        typeAnswer: TypeAnswer.SINGLE_ANSWER,
        answers: [
          {
            uuid: 'e02ab3fa-072c-5efd-b80f-f7ee80d97912',
            content: 'Athens',
            isCorrect: true,
          },
          {
            uuid: '48d75c61-2b9e-543c-b9a9-bc0d8a99cee4',
            content: 'Paris',
            isCorrect: false,
          },
          {
            uuid: '955cf5c2-80b7-5ee3-b879-64418402d32d',
            content: 'London',
            isCorrect: false,
          },
        ],
      },
    ],
  },
];
