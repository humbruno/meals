import { useSession, signIn, signOut } from 'next-auth/react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { Text } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';

const Home: NextPageWithLayout = () => {
  return <Text>Fé pa tu</Text>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: '/login' } };
  }

  return {
    props: {},
  };
}
