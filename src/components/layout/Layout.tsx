import { Box } from '@chakra-ui/react';
import { FC } from 'react';

export const Layout: FC = ({ children }) => {
    return (
        <Box>
            {/* Navigation would go here */}

            <Box as="main">{children}</Box>

            {/* Footer would go here */}
        </Box>
    );
};
