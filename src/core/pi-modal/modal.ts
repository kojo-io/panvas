import {TemplateRef, Type} from "@angular/core";
import {ModalButtons} from "./modal-buttons";

export class Modal<T> {
    content!: string | Type<any> | TemplateRef<any>;
    data?: T;
    size?: 'normal'| 'large';
    fullScreen?: boolean;
    backdropClose?: boolean;
    buttons?: ModalButtons[]
}
