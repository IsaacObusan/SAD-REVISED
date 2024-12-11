import React from 'react';

// Define the learning materials
const learningMaterials = [
  {
    title: 'Career Guide for Visual Impairment',
    description: 'A comprehensive guide to career opportunities for individuals with visual impairment.',
    file: '/assets/visual-impairment-guide.pdf', // Make sure to place the file in the public folder
  },
  {
    title: 'Career Guide for Hearing Impairment',
    description: 'A career development guide for individuals with hearing impairment.',
    file: '/assets/hearing-impairment-guide.pdf', // Make sure to place the file in the public folder
  },
  {
    title: 'Career Guide for Mobility Impairment',
    description: 'Guidelines for individuals with mobility impairment seeking career opportunities.',
    file: '/assets/mobility-impairment-guide.pdf', // Make sure to place the file in the public folder
  },
  {
    title: 'Career Guide for Cognitive Impairment',
    description: 'A guide to support individuals with cognitive impairment in career development.',
    file: '/assets/cognitive-impairment-guide.pdf', // Make sure to place the file in the public folder
  },
  {
    title: 'Speech Impairment Career Development',
    description: 'Resources for individuals with speech impairment to navigate career opportunities.',
    file: '/assets/speech-impairment-guide.pdf', // Make sure to place the file in the public folder
  },
];

const CareerLearningGuide: React.FC = () => {
  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'document';
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PWD Career Learning Guides</h1>
      <p className="mb-6 text-lg">Here are some learning materials to assist in career development for individuals with various disabilities. Click to download a guide.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningMaterials.map((material, index) => (
          <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{material.title}</h2>
            <p className="mb-4">{material.description}</p>
            <button
              onClick={() => handleDownload(material.file)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Download Guide
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerLearningGuide;
