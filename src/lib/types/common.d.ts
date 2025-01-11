
declare interface DatabaseFields {
  _id: string;
  createdAt?: string;
}

declare interface Subject extends DatabaseFields {
  name: string;
  icon: string;
}

declare interface Exam extends DatabaseFields {
  "title": string,
  "duration": number,
  "subject": string,
  "numberOfQuestions": number,
  "active": boolean,
}

declare interface Question extends DatabaseFields {
  question: string;
  answers: { answer: string; key: string }[];
  correct: string;
  answer?: string;
  type?: string; 
  exam?: Exam;
  subject?: Subject;
}
