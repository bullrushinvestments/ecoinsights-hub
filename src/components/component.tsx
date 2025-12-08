import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface BusinessSpec {
  id: string;
  name: string;
  description: string;
  contentTypes: Array<string>;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessSpec, setBusinessSpec] = useState<BusinessSpec>({
    id: '',
    name: '',
    description: '',
    contentTypes: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch initial data from API
        const response = await axios.get('/api/business-specifications');
        setBusinessSpec(response.data);
      } catch (err) {
        setError('Failed to load business specification.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessSpec(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Submit form data to API
      await axios.post('/api/business-specifications', businessSpec);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to create the business specification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && <p role="alert" aria-live="assertive">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={businessSpec.name}
            onChange={handleChange}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={businessSpec.description}
            onChange={handleChange}
            rows={4}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <div>
          <label htmlFor="contentTypes" className="block text-sm font-medium text-gray-700">Content Types</label>
          <input
            type="text"
            name="contentTypes"
            id="contentTypes"
            value={businessSpec.contentTypes.join(', ')}
            onChange={(e) => setBusinessSpec(prevState => ({
              ...prevState,
              contentTypes: e.target.value.split(',')
            }))}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <button
          type="submit"
          className={clsx(
            'w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            loading ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          {loading ? 'Creating...' : 'Create Business Specification'}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessSpecification;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface BusinessSpec {
  id: string;
  name: string;
  description: string;
  contentTypes: Array<string>;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessSpec, setBusinessSpec] = useState<BusinessSpec>({
    id: '',
    name: '',
    description: '',
    contentTypes: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch initial data from API
        const response = await axios.get('/api/business-specifications');
        setBusinessSpec(response.data);
      } catch (err) {
        setError('Failed to load business specification.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessSpec(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Submit form data to API
      await axios.post('/api/business-specifications', businessSpec);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to create the business specification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && <p role="alert" aria-live="assertive">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={businessSpec.name}
            onChange={handleChange}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={businessSpec.description}
            onChange={handleChange}
            rows={4}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <div>
          <label htmlFor="contentTypes" className="block text-sm font-medium text-gray-700">Content Types</label>
          <input
            type="text"
            name="contentTypes"
            id="contentTypes"
            value={businessSpec.contentTypes.join(', ')}
            onChange={(e) => setBusinessSpec(prevState => ({
              ...prevState,
              contentTypes: e.target.value.split(',')
            }))}
            required
            className={clsx(
              'mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          />
        </div>
        <button
          type="submit"
          className={clsx(
            'w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            loading ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          {loading ? 'Creating...' : 'Create Business Specification'}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessSpecification;