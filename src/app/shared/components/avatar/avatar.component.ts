import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  MATX_AVATAR_INITIALS_COLOR_FUNCTION,
  MATX_AVATAR_INITIALS_FUNCTION,
} from './avatar-initials';

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnChanges {
  @HostBinding('class') get hostClasses() {
    return 'matx-avatar';
  }
  @HostBinding('class.matx-avatar-with-icon') get iconClass() {
    return !this.#initials;
  }
  @HostBinding('class.matx-avatar-with-initials') get initialsClass() {
    return !!this.#initials;
  }

  @HostBinding('style.font-size.px') get fontSizeStyle() {
    return this.#initials ? this.getFontSize() : null;
  }

  @HostBinding('style.color') get color() {
    return this.#colors?.foreground ?? null;
  }

  @HostBinding('style.background') get backgroundColor() {
    return this.#colors?.background ?? null;
  }

  #initialsFn = inject(MATX_AVATAR_INITIALS_FUNCTION);
  #initialsColorFn = inject(MATX_AVATAR_INITIALS_COLOR_FUNCTION);
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Input() name?: string;

  @Input() username?: string;

  @Input() fontSizeRatio = 0.45;

  get initials() {
    return this.#initials;
  }
  #initials?: string | null;

  get colors() {
    return this.#colors;
  }
  #colors?: { background: string; foreground: string } | null;

  ngOnChanges() {
    this.#initials = null;
    this.#colors = null;
    if (this.name) {
      this.#initials = this.#initialsFn(this.name);
    }
    if (this.#initials) {
      this.#colors = this.#initialsColorFn(this.username || this.name);
    }
  }

  private getFontSize() {
    const height = this.#elementRef.nativeElement.clientHeight;
    return Math.floor(height * this.fontSizeRatio);
  }
}
