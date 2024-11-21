import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>CMS</title>
        <meta name="description" content="A simple CMS built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <div>
            <Link href="/">
              <a className="text-xl font-bold">CMS</a>
            </Link>
          </div>
          <div>
            <Link href="/posts">
              <a className="px-4">Posts</a>
            </Link>
            <Link href="/pages">
              <a className="px-4">Pages</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} CMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
