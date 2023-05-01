import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { signIn, getProviders } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Flex, Stack, Button, Heading, Text } from '@chakra-ui/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg={'teal.900'}>
      <Flex direction={'column'} gap={8} align={'center'} maxW={'lg'}>
        <Heading color="white" fontSize={'4xl'}>
          Sign in
        </Heading>
        <Stack spacing={10}>
          {Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              p={'20px 50px'}
              variant={'outline'}
              color={'white'}
              _hover={{
                color: 'teal.900',
                bg: 'white',
              }}
              leftIcon={<FcGoogle />}
              onClick={() => signIn(provider.id)}
            >
              <Text>With {provider.name}</Text>
            </Button>
          ))}
        </Stack>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
