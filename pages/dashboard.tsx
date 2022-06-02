import Layout from '@/components/navigation/Layout';
import LogInRequired from '@/components/navigation/LogInRequired';
import TodoContainer from '@/components/todo/TodoContainer';
import { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => (
  <LogInRequired>
    <Layout>
      <Head>
        <title>Todo | Dashboard</title>
      </Head>
      <TodoContainer />
    </Layout>
  </LogInRequired>
);

export default Dashboard;
