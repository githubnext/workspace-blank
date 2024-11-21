import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to the CMS</h1>
        <div className="flex space-x-4">
          <Link href="/posts">
            <a className="px-4 py-2 bg-blue-500 text-white rounded">Manage Posts</a>
          </Link>
          <Link href="/pages">
            <a className="px-4 py-2 bg-green-500 text-white rounded">Manage Pages</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
