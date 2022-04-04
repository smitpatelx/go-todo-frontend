import type { NextPage } from 'next';
import { AnimatePresence } from 'framer-motion';
import TodoContainer from '@/components/statments/TodoContainer';

const Home: NextPage = () => (
  <AnimatePresence
    exitBeforeEnter
  >
    <TodoContainer />
  </AnimatePresence>
);
export default Home;
