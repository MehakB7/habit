
export type confirmationModalProps = {
    isOpen: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmCb: () => void;
    cancelCb: () => void;
}