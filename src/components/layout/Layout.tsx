import { Box, Container } from '@chakra-ui/react';
import { FC } from 'react';

export const Layout: FC = ({ children }) => {
    return (
        <Box>
            {/* Navigation would go here */}

            <Container as="main" maxW="container.xl" py="16">
                {children}
            </Container>

            {/* Footer would go here */}
        </Box>
    );
};
