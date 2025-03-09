export enum SubjectType {
  Mathematics = 'mathematics',
  English = 'english',
  VerbalReasoning = 'verbal-reasoning',
  NonVerbalReasoning = 'non-verbal-reasoning'
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface Subject {
  type: SubjectType;
  name: string;
  description: string;
  topics: Topic[];
}

export const SUBJECTS: Subject[] = [
  {
    type: SubjectType.Mathematics,
    name: 'Mathematics',
    description: 'Learn number operations, fractions, geometry, algebra, and data interpretation',
    topics: [
      { id: 'math-1', name: 'Number Operations', description: 'Addition, subtraction, multiplication, division' },
      { id: 'math-2', name: 'Fractions, Decimals & Percentages', description: 'Working with fractions, decimals, and percentages' },
      { id: 'math-3', name: 'Geometry', description: 'Shapes, angles, area, perimeter' },
      { id: 'math-4', name: 'Algebra', description: 'Basic equations and algebraic concepts' },
      { id: 'math-5', name: 'Data Interpretation', description: 'Graphs, charts, tables' }
    ]
  },
  {
    type: SubjectType.English,
    name: 'English',
    description: 'Improve reading comprehension, grammar, vocabulary, and writing skills',
    topics: [
      { id: 'eng-1', name: 'Reading Comprehension', description: 'Reading passages with questions to test understanding' },
      { id: 'eng-2', name: 'Grammar & Punctuation', description: 'Identifying errors, sentence structure' },
      { id: 'eng-3', name: 'Vocabulary', description: 'Synonyms, antonyms, word meanings' },
      { id: 'eng-4', name: 'Writing', description: 'Creative or persuasive writing tasks' }
    ]
  },
  {
    type: SubjectType.VerbalReasoning,
    name: 'Verbal Reasoning',
    description: 'Develop word relationships, logical deductions, and puzzle-solving skills',
    topics: [
      { id: 'vr-1', name: 'Word Relationships', description: 'Analogies, synonyms, antonyms' },
      { id: 'vr-2', name: 'Codes & Sequences', description: 'Decoding patterns in words and letters' },
      { id: 'vr-3', name: 'Logical Deductions', description: 'Solving logical puzzles and problems' },
      { id: 'vr-4', name: 'Sentence Completion', description: 'Finding missing words and completing sentences' }
    ]
  },
  {
    type: SubjectType.NonVerbalReasoning,
    name: 'Non-Verbal Reasoning',
    description: 'Master pattern recognition, spatial awareness, and visual problem-solving',
    topics: [
      { id: 'nvr-1', name: 'Patterns & Sequences', description: 'Identifying patterns and sequences in shapes' },
      { id: 'nvr-2', name: 'Transformations', description: 'Rotations, reflections, and symmetry' },
      { id: 'nvr-3', name: 'Matrices & Grids', description: 'Completing grids or matrices' },
      { id: 'nvr-4', name: 'Odd One Out', description: 'Identifying odd ones out in a set of shapes' }
    ]
  }
];
