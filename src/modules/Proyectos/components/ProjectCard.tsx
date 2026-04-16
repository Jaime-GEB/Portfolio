import { Box, Typography, Paper, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileIcon, LockIcon, PlayIcon } from './ExplorerIcons';

interface Project {
    nombre: string;
    descripcion: string;
    lenguaje: string;
    frameworks: string[];
    dependencias: any;
    status?: string;
    demo?: string;
}

interface ProjectCardProps {
    project: Project;
    isSelected: boolean;
    onClick: () => void;
    index: number;
    accentColor: string;
    isDark: boolean;
}

const ProjectCard = ({ project, isSelected, onClick, index, accentColor, isDark }: ProjectCardProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const baseBgColor = isDark ? theme.palette.background.paper : '#fff';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
        >
            <Paper
                onClick={onClick}
                sx={{
                    p: { xs: 1.5, md: 2 },
                    cursor: 'pointer',
                    backgroundColor: isSelected
                        ? alpha(accentColor, 0.1) 
                        : alpha(baseBgColor, 0.5),
                    border: '1px solid',
                    borderColor: isSelected 
                        ? accentColor 
                        : alpha(accentColor, 0.2),
                    borderRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: accentColor,
                        backgroundColor: alpha(accentColor, 0.05),
                        transform: 'translateX(5px)'
                    }
                }}
            >
                <FileIcon color={isSelected ? accentColor : alpha(accentColor, 0.6)} />
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ 
                            fontFamily: 'Doto', 
                            fontWeight: 'bold', 
                            fontSize: '0.9rem',
                            color: isSelected ? accentColor : 'text.primary'
                        }}>
                            {project.nombre.toUpperCase()}.EXE
                        </Typography>
                        {(project.status?.toLowerCase() === 'privado' || project.status?.toLowerCase() === 'private') && (
                            <Box title="Private repository" sx={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                                <LockIcon color={isSelected ? accentColor : 'currentColor'} />
                            </Box>
                        )}
                        {project.demo && (
                            <Box title="Has demo" sx={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                                <PlayIcon color={isSelected ? accentColor : 'currentColor'} />
                            </Box>
                        )}
                    </Box>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                        {t('projects_page.type')}: {project.lenguaje}
                    </Typography>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default ProjectCard;
