export interface TableActions {
  actionType: string;
  buttonType: 'icon-button' | 'button';
  buttonTypeContent: string;
  buttonSize: 'extra small' | 'small' | 'normal' | 'large' | 'extra large';
  buttonColor: 'primary' | 'success' | 'danger' | 'warning' | 'info'
}
