import { Box, alpha } from '@mui/material';
import { ChevronLeft, ChevronRight } from './ExplorerIcons';

interface ProjectPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    accentColor: string;
    isDark: boolean;
}

const ProjectPagination = ({ currentPage, totalPages, onPageChange, accentColor, isDark }: ProjectPaginationProps) => {
    return (
        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Box 
                onClick={() => onPageChange(currentPage - 1)}
                sx={{ 
                    cursor: 'pointer', 
                    opacity: currentPage === 0 ? 0.3 : 1,
                    p: 1,
                    border: '1px solid',
                    borderColor: alpha(accentColor, 0.3),
                    '&:hover': { backgroundColor: alpha(accentColor, 0.1) },
                    display: 'flex',
                    alignItems: 'center'
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
                            onClick={() => onPageChange(i)}
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
                onClick={() => onPageChange(currentPage + 1)}
                sx={{ 
                    cursor: 'pointer', 
                    opacity: currentPage === totalPages - 1 ? 0.3 : 1,
                    p: 1,
                    border: '1px solid',
                    borderColor: alpha(accentColor, 0.3),
                    '&:hover': { backgroundColor: alpha(accentColor, 0.1) },
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <ChevronRight color={accentColor} />
            </Box>
        </Box>
    );
};

export default ProjectPagination;
