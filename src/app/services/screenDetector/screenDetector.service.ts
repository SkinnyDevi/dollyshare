import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ScreenDetectorService {
  isPhoneScreen(): boolean {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    const isNarrow = width < 768;
    const isPhoneLikeRatio = height > width || width < 850;
    const isHighDensity = pixelRatio >= 2; // DPI

    return isNarrow && isPhoneLikeRatio && isHighDensity;
  }

  checkOnResize(callback: (isPhone: boolean) => void) {
    window.addEventListener('resize', () => {
      callback(this.isPhoneScreen());
    });
  }
}
