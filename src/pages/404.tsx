import { Box, Button, Center, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();

    return (
        <Box height="100vh">
            <Center>
                <Stack spacing="8">
                    <Heading>{"The page you're looking for can't be found."}</Heading>
                    <Box>
                        <Button colorScheme="green" onClick={() => router.replace('/')}>
                            Go Home
                        </Button>
                    </Box>
                </Stack>
            </Center>
        </Box>
    );
};

export default NotFound;
