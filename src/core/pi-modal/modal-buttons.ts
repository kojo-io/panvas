export class ModalButtons {
    label!: string;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    handle!: () => void;
}
