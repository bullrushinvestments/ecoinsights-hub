import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  questionText: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

const WriteTests: React.FC = () => {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/api/tests/${router.query.id}`);
        setTest(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load test');
        setLoading(false);
      }
    };

    if (!loading && !test) {
      fetchTest();
    }
  }, [loading, router.query.id]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/tests/${router.query.id}`, test);
      setError(null);
    } catch (err) {
      setError('Failed to save test');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!test || error) return <div className="text-red-500 text-center">{error}</div>;

  const handleQuestionChange = (index: number, questionIndex: number, key: keyof Question, value: any) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((question, qIdx) =>
        qIdx === index ? { ...question, answers: question.answers.map((answer, aIdx) => (aIdx === questionIndex ? { ...answer, [key]: value } : answer)) } : question
      ),
    }));
  };

  const handleQuestionAdd = () => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: [
        ...prevTest.questions,
        {
          questionText: '',
          answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
        },
      ],
    }));
  };

  const handleQuestionRemove = (index: number) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Edit Test</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="title" className="block text-sm font-medium leading-6">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={test.title}
          onChange={(e) => setTest({ ...test, title: e.target.value })}
          required
          aria-label="Title of the test"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label htmlFor="description" className="block text-sm font-medium leading-6 mt-2">
          Description
        </label>
        <textarea
          id="description"
          value={test.description}
          onChange={(e) => setTest({ ...test, description: e.target.value })}
          required
          aria-label="Description of the test"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {test.questions.map((question, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-lg font-medium mb-1">Question {index + 1}</h3>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, -1, 'questionText', e.target.value)}
              required
              placeholder={`Question ${index + 1}`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="mt-1">
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleQuestionChange(index, answerIndex, 'text', e.target.value)}
                  required
                  placeholder={`Answer ${answerIndex + 1}`}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <label htmlFor={`isCorrect-${index}-${answerIndex}`} className="ml-2">
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(e) => handleQuestionChange(index, answerIndex, 'isCorrect', e.target.checked)}
                    id={`isCorrect-${index}-${answerIndex}`}
                    aria-label={`Is correct for Answer ${answerIndex + 1}`}
                  />
                  Correct
                </label>
              </div>
            ))}
            <button type="button" onClick={() => handleQuestionAdd()} className="mt-2 text-indigo-600 hover:text-indigo-900">
              Add another answer
            </button>
            {question.answers.length > 1 && (
              <button type="button" onClick={() => handleQuestionRemove(index)} className="ml-2 mt-2 text-red-500 hover:text-red-700">
                Remove question
              </button>
            )}
          </div>
        ))}
        <button
          type="submit"
          onClick={handleSave}
          disabled={!test.title || !test.description || test.questions.some((q) => q.questionText === '' || q.answers.some((a) => a.text === '') || !q.answers.find((a) => a.isCorrect))}
          className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
            !test.title || !test.description || test.questions.some((q) => q.questionText === '' || q.answers.some((a) => a.text === '') || !q.answers.find((a) => a.isCorrect))
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          Save Test
        </button>
      </form>
    </div>
  );
};

export default WriteTests;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  questionText: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

const WriteTests: React.FC = () => {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/api/tests/${router.query.id}`);
        setTest(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load test');
        setLoading(false);
      }
    };

    if (!loading && !test) {
      fetchTest();
    }
  }, [loading, router.query.id]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/tests/${router.query.id}`, test);
      setError(null);
    } catch (err) {
      setError('Failed to save test');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!test || error) return <div className="text-red-500 text-center">{error}</div>;

  const handleQuestionChange = (index: number, questionIndex: number, key: keyof Question, value: any) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((question, qIdx) =>
        qIdx === index ? { ...question, answers: question.answers.map((answer, aIdx) => (aIdx === questionIndex ? { ...answer, [key]: value } : answer)) } : question
      ),
    }));
  };

  const handleQuestionAdd = () => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: [
        ...prevTest.questions,
        {
          questionText: '',
          answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
        },
      ],
    }));
  };

  const handleQuestionRemove = (index: number) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Edit Test</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="title" className="block text-sm font-medium leading-6">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={test.title}
          onChange={(e) => setTest({ ...test, title: e.target.value })}
          required
          aria-label="Title of the test"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label htmlFor="description" className="block text-sm font-medium leading-6 mt-2">
          Description
        </label>
        <textarea
          id="description"
          value={test.description}
          onChange={(e) => setTest({ ...test, description: e.target.value })}
          required
          aria-label="Description of the test"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {test.questions.map((question, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-lg font-medium mb-1">Question {index + 1}</h3>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, -1, 'questionText', e.target.value)}
              required
              placeholder={`Question ${index + 1}`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="mt-1">
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleQuestionChange(index, answerIndex, 'text', e.target.value)}
                  required
                  placeholder={`Answer ${answerIndex + 1}`}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <label htmlFor={`isCorrect-${index}-${answerIndex}`} className="ml-2">
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(e) => handleQuestionChange(index, answerIndex, 'isCorrect', e.target.checked)}
                    id={`isCorrect-${index}-${answerIndex}`}
                    aria-label={`Is correct for Answer ${answerIndex + 1}`}
                  />
                  Correct
                </label>
              </div>
            ))}
            <button type="button" onClick={() => handleQuestionAdd()} className="mt-2 text-indigo-600 hover:text-indigo-900">
              Add another answer
            </button>
            {question.answers.length > 1 && (
              <button type="button" onClick={() => handleQuestionRemove(index)} className="ml-2 mt-2 text-red-500 hover:text-red-700">
                Remove question
              </button>
            )}
          </div>
        ))}
        <button
          type="submit"
          onClick={handleSave}
          disabled={!test.title || !test.description || test.questions.some((q) => q.questionText === '' || q.answers.some((a) => a.text === '') || !q.answers.find((a) => a.isCorrect))}
          className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
            !test.title || !test.description || test.questions.some((q) => q.questionText === '' || q.answers.some((a) => a.text === '') || !q.answers.find((a) => a.isCorrect))
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          Save Test
        </button>
      </form>
    </div>
  );
};

export default WriteTests;