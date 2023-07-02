import {Injectable, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {ModalComponent} from "./modal/modal.component";
import {Modal} from "./modal";
import {ModalRef} from "./modal-ref";

@Injectable()
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(modal: Modal<T>): ModalRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: ['backdrop-blur-[6px]', 'bg-gray-400/30', 'fixed', 'inset-0', 'z-10']
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new ModalRef<R, T>(overlayRef, modal);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(ModalComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: ModalRef, inj: Injector) {
    const injectorTokens = new WeakMap([[ModalRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}
