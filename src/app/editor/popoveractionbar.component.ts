import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PopOverAct } from './models';


@Component({
  selector: 'ha-popover-actionbar',
  templateUrl: './popoveractionbar.component.html',
  styleUrls: ['./hansinieditor.css']
})
export class PopoverActionBar implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("s PopoverToolBar " + JSON.stringify(changes));
  }

  @Input() isActive = false;
  @Input() inParatype: string;   //h1/h2/code/list
  @Input() inCurrentLine: number = -1;
  @Input() inTotalLine: number = 100;

  @Output() actionSelected = new EventEmitter<PopOverAct>();

  setAction(act:string) {
    console.clear();
    console.log("setAction " + act);
    let ret: PopOverAct = new PopOverAct(this.inCurrentLine, act);
    this.actionSelected.emit(ret);
  }
}