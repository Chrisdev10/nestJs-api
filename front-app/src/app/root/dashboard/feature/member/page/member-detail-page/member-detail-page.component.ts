import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, of, tap } from 'rxjs';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
})
export class MemberDetailPageComponent implements OnInit {
  @Input() id!: string;
  readonly memberService = inject(MemberService);
  detailTest: Signal<string> = this.memberService.detail$;
  member: WritableSignal<string> = signal('no body');
  memberComputedTest: Signal<string> = computed(
    () => `this is a computed value including ${this.member()}`
  );
  memberEffect = effect(() =>
    console.log(`Mon effect sur le membre ${this.member()}`)
  );
  memberComputedEffect = effect(() =>
    console.log(`Effect sur computed ${this.memberComputedTest()}`)
  );
  ngOnInit(): void {
    this.getData();
    this.memberService.detail$.set(this.id);
  }
  getData(): void {
    of(this.member())
      .pipe(
        delay(5000),
        tap(() => this.member.set('Nicolas'))
      )
      .subscribe();
  }
}
