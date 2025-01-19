

export type DropdownMenuProps = {
    trigger: React.ReactNode;
    options:
        {
            icon: React.ReactNode;
            label: string;
            onClick: () => void;
        }[];
    
}