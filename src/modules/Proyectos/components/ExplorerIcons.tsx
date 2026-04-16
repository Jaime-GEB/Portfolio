export const FileIcon = ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" 
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 2V9H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ChevronLeft = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ChevronRight = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const LockIcon = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1.5" fill={color}/>
    </svg>
);

export const PlayIcon = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5 3 19 12 5 21 5 3" fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round"/>
    </svg>
);
