import Layout from '@/components/navigation/Layout';
import TodoContainer from '@/components/todo/TodoContainer';
import { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => (
  <Layout>
    <Head>
      <title>Todo | Dashboard</title>
    </Head>
    <TodoContainer />
  </Layout>
);

export default Dashboard;
