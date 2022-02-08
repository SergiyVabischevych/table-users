import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRangeComponent {

  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 20;
  @Input() disable: boolean;

  @Output() valueChanged = new EventEmitter<number>();

  onRangeValueChanged({ target }): void {
    this.valueChanged.emit((target as HTMLInputElement).valueAsNumber);
  }

}
