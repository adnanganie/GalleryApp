import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonBadge,
  IonLabel,
  IonAvatar,
  IonItem,
  IonList,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSkeletonText,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonModal,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { PhotoService } from '../services/photos.service';
import { Photos } from '../models/photos';
import { AnimationController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonBadge,
    IonAvatar,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    IonAlert,
    DatePipe,
    RouterModule,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonModal,
    IonButtons,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class HomePage implements OnInit {
  private photoService = inject(PhotoService);

  private currentPage = 1;
  public photos: Photos[] = [];
  public isLoading = true;
  public error = null;
  public dummyArray = new Array(5);
  isModalOpen: boolean = false;

  selectedPhoto: Photos | undefined;

  constructor(private animationCtrl: AnimationController) {
    addIcons({
      close,
      closeCircleOutline,
    });
  }

  ngOnInit() {
    this.loadPhotos();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async loadPhotos(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.photoService
      .getPhotos(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.photos.push(...res.photos);

          // Resolve the infinite scroll promise to tell Ionic that we are done
          event?.target.complete();

          // Disable the infinite scroll when we reach the end of the list
          if (event) {
            event.target.disabled = res.total_results === this.currentPage;
          }
        },
      });
  }

  // This method is called by the infinite scroll event handler
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadPhotos(event);
  }

  handleCardTapAction(photo: Photos) {
    this.selectedPhoto = photo;
    this.setOpen(true);
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
