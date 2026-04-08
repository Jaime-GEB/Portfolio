import { Popover, Box } from "@mui/material";

// Componente de layout para popovers con posicionamiento automático
const MyPopover = ({ children, anchorEl, handleClosePopover }: { children: React.ReactNode; anchorEl: HTMLElement | null; handleClosePopover: () => void }) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            disableScrollLock
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: '80vw',
                        maxHeight: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        margin: '8px'
                    }
                }
            }}
            sx={{
                '& .MuiPopover-paper': {
                    overflow: 'visible'
                }
            }}
        >
            <Box sx={{ overflowY: 'auto', flex: 1 }}>
                {children}
            </Box>
        </Popover>
    );
};

export default MyPopover;