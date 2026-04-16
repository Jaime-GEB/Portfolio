import { Box, Typography, Paper, alpha, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LockIcon, PlayIcon } from './ExplorerIcons';

interface Project {
    nombre: string;
    descripcion: string;
    lenguaje: string;
    frameworks: string[];
    dependencias: any;
    status?: string;
    demo?: string;
}

interface ProjectDetailsProps {
    project: Project;
    accentColor: string;
    isDark: boolean;
    systemRef: string;
}

const ProjectDetails = ({ project, accentColor, isDark, systemRef }: ProjectDetailsProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            height: '100%',
            backgroundColor: alpha(isDark ? theme.palette.background.paper : '#fff', 0.8),
            borderLeft: `4px solid ${accentColor}`,
            borderRadius: 0,
            position: 'relative',
            overflow: 'auto'
        }}>
            {/* Scanner effect line */}
            <Box sx={{ 
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                animation: 'scan 4s linear infinite',
                '@keyframes scan': {
                    '0%': { top: '0%' },
                    '100%': { top: '100%' }
                }
            }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h5" sx={{ fontFamily: 'Doto', fontWeight: 'bold', color: accentColor }}>
                    {project.nombre.toUpperCase()}
                </Typography>
                {(project.status?.toLowerCase() === 'privado' || project.status?.toLowerCase() === 'private') && (
                    <Box sx={{ 
                        display: 'flex', alignItems: 'center', gap: 0.5,
                        px: 1, py: 0.25,
                        border: '1px solid', borderColor: 'warning.main',
                        color: 'warning.main', fontSize: '0.6rem', fontFamily: 'monospace'
                    }}>
                        <LockIcon color="currentColor" />
                        PRIVATE
                    </Box>
                )}
            </Box>

            <Typography variant="body2" sx={{ 
                fontFamily: 'monospace', 
                color: 'text.primary', 
                mb: 3, 
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
            }}>
                {project.descripcion.split('. ').join('.\n\n')}
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: accentColor, fontWeight: 'bold' }}>{t('projects_page.stack_analysis')}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {project.frameworks.map((fw: string) => (
                        <Box key={fw} sx={{ 
                            px: 1.5, py: 0.5, border: '1px solid', borderColor: accentColor,
                            fontSize: '0.7rem', fontFamily: 'monospace', color: accentColor
                        }}>
                            {fw.toUpperCase()}
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>{t('projects_page.dependency_tree')}</Typography>
                <Box sx={{ 
                    mt: 1, p: 2, backgroundColor: alpha('#000', 0.1), 
                    border: '1px dashed', borderColor: alpha(accentColor, 0.3),
                    maxHeight: '200px', overflowY: 'auto'
                }}>
                    {Object.keys(project.dependencias.dependencies || {}).map(dep => (
                        <Typography key={dep} sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'text.secondary', opacity: 0.8 }}>
                            {`> ${dep}@${project.dependencias.dependencies[dep]}`}
                        </Typography>
                    ))}
                </Box>
            </Box>
            
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', color: alpha(accentColor, 0.5) }}>
                    {t('projects_page.system_ref')} {systemRef}
                </Typography>
                {project.demo && (
                    <Box
                        component={'a'}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 1.5,
                            py: 0.75,
                            border: '1px solid',
                            borderColor: accentColor,
                            backgroundColor: alpha(accentColor, 0.1),
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            color: accentColor,
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            '&:hover': {
                                backgroundColor: alpha(accentColor, 0.2),
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <PlayIcon color={accentColor} />
                        DEMO
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default ProjectDetails;
