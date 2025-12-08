import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface IRequirement {
  title: string;
  description?: string;
  isEssential: boolean;
}

interface IGatherRequirementsForm {
  requirements: IRequirement[];
}

const GatherRequirements: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<IGatherRequirementsForm>();
  const router = useRouter();

  const onSubmit = (data: IGatherRequirementsForm) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Data submitted:', data);
      router.push('/confirmation');
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={`requirement-${index}`} className="mb-4">
          <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
            Requirement Title
          </label>
          <input
            id={`title-${index}`}
            type="text"
            {...register(`requirements.${index}.title`)}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formState.errors?.[`requirements.${index}`]?.title && (
            <p className="text-red-500 text-xs italic">{formState.errors[`requirements.${index}`].title.message}</p>
          )}
          
          <label htmlFor={`description-${index}`} className="mt-2 block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id={`description-${index}`}
            {...register(`requirements.${index}.description`)}
            rows={3}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          
          <label htmlFor={`isEssential-${index}`} className="block text-sm font-medium text-gray-700 mt-2">
            Is Essential?
          </label>
          <select
            id={`isEssential-${index}`}
            {...register(`requirements.${index}.isEssential`)}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      ))}
      
      <button
        type="submit"
        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default GatherRequirements;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface IRequirement {
  title: string;
  description?: string;
  isEssential: boolean;
}

interface IGatherRequirementsForm {
  requirements: IRequirement[];
}

const GatherRequirements: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<IGatherRequirementsForm>();
  const router = useRouter();

  const onSubmit = (data: IGatherRequirementsForm) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Data submitted:', data);
      router.push('/confirmation');
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={`requirement-${index}`} className="mb-4">
          <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
            Requirement Title
          </label>
          <input
            id={`title-${index}`}
            type="text"
            {...register(`requirements.${index}.title`)}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formState.errors?.[`requirements.${index}`]?.title && (
            <p className="text-red-500 text-xs italic">{formState.errors[`requirements.${index}`].title.message}</p>
          )}
          
          <label htmlFor={`description-${index}`} className="mt-2 block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id={`description-${index}`}
            {...register(`requirements.${index}.description`)}
            rows={3}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          
          <label htmlFor={`isEssential-${index}`} className="block text-sm font-medium text-gray-700 mt-2">
            Is Essential?
          </label>
          <select
            id={`isEssential-${index}`}
            {...register(`requirements.${index}.isEssential`)}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      ))}
      
      <button
        type="submit"
        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default GatherRequirements;