import { useState, useMemo } from 'react';
import { Box, Typography, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import proyectosData from '../../../utils/proyectos.json';

// --- Custom SVGs for a futuristic look (No Material Icons) ---

const FileIcon = ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" 
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 2V9H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronLeft = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronRight = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LockIcon = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1.5" fill={color}/>
    </svg>
);

// --- Components ---

interface Project {
    nombre: string;
    descripcion: string;
    lenguaje: string;
    frameworks: string[];
    dependencias: any;
    status?: string;
}

const ITEMS_PER_PAGE = 6;

const ProjectExplorer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDark = theme.palette.mode === 'dark';
    const accentColor = theme.palette.primary.main;

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        // Toggle: si clickeas el mismo proyecto, se cierra
        if (selectedProject?.nombre === project.nombre) {
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
        }
    };

    const { t } = useTranslation();
    
    // Obtener descripciones traducidas desde i18n
    const descripciones = t('proyectos.descripciones', { returnObjects: true }) as Record<string, string>;
    
    // Fusionar datos técnicos (proyectos.json) con descripciones (i18n)
    const projects = useMemo(() => {
        return (proyectosData.proyectos as any[]).map(proyecto => ({
            ...proyecto,
            descripcion: descripciones[proyecto.nombre] || proyecto.nombre
        }));
    }, [descripciones]);
    
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    // Impure values should be held in state with a lazy initializer
    const [systemRef] = useState(() => `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`);

    const currentProjects = useMemo(() => {
        const start = currentPage * ITEMS_PER_PAGE;
        return projects.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, projects]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            setSelectedProject(null); // Reset selection on page change
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Explorer Header */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid',
                borderColor: alpha(accentColor, 0.3),
                pb: 1,
                mb: 2
            }}>
                <Typography sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.8rem', 
                    color: accentColor,
                    fontWeight: 'bold',
                    letterSpacing: '0.2em'
                }}>
                    {t('projects_page.file_explorer')}
                </Typography>
                <Typography sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.8rem', 
                    color: 'text.secondary',
                    opacity: 0.6
                }}>
                    {t('projects_page.total_files', { count: projects.length })}
                </Typography>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: selectedProject ? 1.5 : 2, md: 3 }
            }}>
                {/* File List */}
                <Box sx={{ 
                    flex: { xs: '1 1 auto', md: selectedProject ? '0 0 40%' : '1 1 100%' },
                    transition: 'flex 0.4s ease',
                }}>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { 
                            xs: selectedProject ? '1fr' : '1fr',
                            sm: selectedProject ? '1fr 1fr' : '1fr 1fr', 
                            md: selectedProject ? '1fr' : '1fr 1fr 1fr' 
                        }, 
                        gap: { xs: selectedProject ? 1 : 2, md: 2 }
                    }}>
                        <AnimatePresence mode="wait">
                            {currentProjects.map((project, index) => {
                                const isSelected = selectedProject?.nombre === project.nombre;
                                const baseBgColor = isDark ? theme.palette.background.paper : '#fff';
                                
                                return (
                                    <Box key={project.nombre} sx={{ gridColumn: { xs: '1 / -1', md: 'auto' }, display: selectedProject && !isSelected ? { xs: 'none', md: 'block' } : 'block' }}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Paper
                                                onClick={() => handleProjectClick(project)}
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
                                                        {project.status?.toLowerCase() === 'privado' || project.status?.toLowerCase() === 'private' ? (
                                                            <Box 
                                                                title="Private repository" 
                                                                sx={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}
                                                            >
                                                                <LockIcon color={isSelected ? accentColor : 'currentColor'} />
                                                            </Box>
                                                        ) : null}
                                                    </Box>
                                                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                                        {t('projects_page.type')}: {project.lenguaje}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </motion.div>

                                        {/* Details Pane - Inline in mobile, hidden in desktop */}
                                        <AnimatePresence>
                                            {isSelected && isMobile && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    style={{ gridColumn: '1 / -1' }}
                                                >
                                                    <Paper sx={{ 
                                                        p: { xs: 2, md: 3 }, 
                                                        mt: 1,
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
                                                        
                                                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', color: alpha(accentColor, 0.5) }}>
                                                                {t('projects_page.system_ref')} {systemRef}
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Box>
                                );
                            })}
                        </AnimatePresence>
                    </Box>

                    {/* Pagination Controls */}
                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                        <Box 
                            onClick={() => handlePageChange(currentPage - 1)}
                            sx={{ 
                                cursor: 'pointer', 
                                opacity: currentPage === 0 ? 0.3 : 1,
                                p: 1,
                                border: '1px solid',
                                borderColor: alpha(accentColor, 0.3),
                                '&:hover': { backgroundColor: alpha(accentColor, 0.1) }
                            }}
                        >
                            <ChevronLeft color={accentColor} />
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const fontActiveColor = isDark ? '#000' : '#fff';
                                return (
                                    <Box 
                                        key={`page-${i}`}
                                        onClick={() => handlePageChange(i)}
                                        sx={{ 
                                            width: 30, 
                                            height: 30, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            fontFamily: 'monospace',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            backgroundColor: currentPage === i ? accentColor : 'transparent',
                                            color: currentPage === i ? fontActiveColor : accentColor,
                                            border: '1px solid',
                                            borderColor: accentColor,
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box 
                            onClick={() => handlePageChange(currentPage + 1)}
                            sx={{ 
                                cursor: 'pointer', 
                                opacity: currentPage === totalPages - 1 ? 0.3 : 1,
                                p: 1,
                                border: '1px solid',
                                borderColor: alpha(accentColor, 0.3),
                                '&:hover': { backgroundColor: alpha(accentColor, 0.1) }
                            }}
                        >
                            <ChevronRight color={accentColor} />
                        </Box>
                    </Box>
                </Box>

                {/* Details Pane - Side panel in desktop, hidden in mobile */}
                <AnimatePresence>
                    {selectedProject && !isMobile && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            sx={{ flex: '1 1 auto', minWidth: 0, display: { xs: 'none', md: 'block' } }}
                        >
                            <Paper sx={{ 
                                p: { xs: 2, md: 3 }, 
                                height: '100%', 
                                minHeight: '300px',
                                backgroundColor: alpha(isDark ? theme.palette.background.paper : '#fff', 0.8),
                                borderLeft: `4px solid ${accentColor}`,
                                borderRadius: 0,
                                position: 'relative',
                                overflow: 'hidden'
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
                                        {selectedProject.nombre.toUpperCase()}
                                    </Typography>
                                    {(selectedProject.status?.toLowerCase() === 'privado' || selectedProject.status?.toLowerCase() === 'private') && (
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
                                    {selectedProject.descripcion}
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="overline" sx={{ color: accentColor, fontWeight: 'bold' }}>{t('projects_page.stack_analysis')}</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                        {selectedProject.frameworks.map((fw: string) => (
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
                                        {Object.keys(selectedProject.dependencias.dependencies || {}).map(dep => (
                                            <Typography key={dep} sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'text.secondary', opacity: 0.8 }}>
                                                {`> ${dep}@${selectedProject.dependencias.dependencies[dep]}`}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                                
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.6rem', color: alpha(accentColor, 0.5) }}>
                                        {t('projects_page.system_ref')} {systemRef}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default ProjectExplorer;
