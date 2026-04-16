import { useState, useMemo } from 'react';
import { Box, Typography, alpha, useTheme, useMediaQuery} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import proyectosData from '../../../utils/proyectos.json';

// Modular Components
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';
import ProjectPagination from './ProjectPagination';

interface Project {
    nombre: string;
    descripcion: string;
    lenguaje: string;
    frameworks: string[];
    dependencias: any;
    status?: string;
    demo?: string;
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
        if (selectedProject?.nombre === project.nombre) {
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
        }
    };

    const { t } = useTranslation();
    
    const descripciones = t('proyectos.descripciones', { returnObjects: true }) as Record<string, string>;
    
    const projects = useMemo(() => {
        return (proyectosData.proyectos as any[]).map(proyecto => ({
            ...proyecto,
            descripcion: descripciones[proyecto.nombre] || proyecto.nombre
        }));
    }, [descripciones]);
    
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    const [systemRef] = useState(() => `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`);

    const currentProjects = useMemo(() => {
        const start = currentPage * ITEMS_PER_PAGE;
        return projects.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, projects]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            setSelectedProject(null);
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
                                
                                return (
                                    <Box key={project.nombre} sx={{ gridColumn: { xs: '1 / -1', md: 'auto' }, display: selectedProject && !isSelected ? { xs: 'none', md: 'block' } : 'block' }}>
                                        <ProjectCard 
                                            project={project}
                                            isSelected={isSelected}
                                            onClick={() => handleProjectClick(project)}
                                            index={index}
                                            accentColor={accentColor}
                                            isDark={isDark}
                                        />

                                        {/* Mobile Inline Details */}
                                        <AnimatePresence>
                                            {isSelected && isMobile && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    style={{ gridColumn: '1 / -1', marginTop: '8px' }}
                                                >
                                                    <ProjectDetails 
                                                        project={project} 
                                                        accentColor={accentColor} 
                                                        isDark={isDark} 
                                                        systemRef={systemRef} 
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Box>
                                );
                            })}
                        </AnimatePresence>
                    </Box>

                    <ProjectPagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        accentColor={accentColor}
                        isDark={isDark}
                    />
                </Box>

                {/* Desktop Side Panel Details */}
                <AnimatePresence>
                    {selectedProject && !isMobile && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            sx={{ flex: '1 1 auto', minWidth: 0, display: { xs: 'none', md: 'block' } }}
                        >
                            <ProjectDetails 
                                project={selectedProject} 
                                accentColor={accentColor} 
                                isDark={isDark} 
                                systemRef={systemRef} 
                            />
                        </Box>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default ProjectExplorer;
