import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectExplorer from './components/ProjectExplorer';

const ProyectosContent = () => {
    return (
        /* Project Explorer (Center Content) */
        <Box 
            sx={{ 
                flex: 1, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-start',
                pt: { xs: 4, md: 6 },
                zIndex: 1
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <ProjectExplorer />
            </motion.div>
        </Box>
    );
};

export default ProyectosContent;
