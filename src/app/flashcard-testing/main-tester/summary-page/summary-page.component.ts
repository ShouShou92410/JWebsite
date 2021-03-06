import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MainTesterCard } from '../../test-starter.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryPageComponent implements OnInit {
  @Input() mainTesterCards: MainTesterCard[];
  @Input() userAnswers: string[];

  public currentQuestionIndex = -1;
  public score: number;

  constructor() { }

  ngOnInit() {
    this.score = this.userAnswers.filter((ans, index) => ans === this.mainTesterCards[index].answer).length;
  }

}
