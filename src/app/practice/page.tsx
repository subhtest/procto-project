'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  starterCode: string;
  testCases: {
    input: string;
    output: string;
  }[];
}

const sampleProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
    testCases: [
      { input: '[2,7,11,15], 9', output: '[0,1]' },
      { input: '[3,2,4], 6', output: '[1,2]' },
      { input: '[3,3], 6', output: '[0,1]' },
    ],
  },
  {
    id: '2',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    starterCode: `class ListNode {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // Your code here
}`,
    testCases: [
      { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: '[1,2]', output: '[2,1]' },
      { input: '[]', output: '[]' },
    ],
  },
];

export default function Practice() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(sampleProblems[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  const handleRunCode = async () => {
    // In a real application, this would send the code to a backend service
    // For now, we'll just show a mock output
    setOutput('Running tests...\nAll test cases passed!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Practice Problems</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problems List */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Problems</h2>
                  <div className="space-y-2">
                    {sampleProblems.map((problem) => (
                      <button
                        key={problem.id}
                        onClick={() => {
                          setSelectedProblem(problem);
                          setCode(problem.starterCode);
                          setOutput(null);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                          selectedProblem.id === problem.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{problem.title}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor and Output */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedProblem.title}
                    </h2>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {selectedProblem.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <MonacoEditor
                      height="400px"
                      defaultLanguage="javascript"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleRunCode}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Run Code
                    </button>
                  </div>

                  {output && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Output</h3>
                      <pre className="bg-gray-50 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 