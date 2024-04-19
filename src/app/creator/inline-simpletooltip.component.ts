import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'simple-add-tooltip',
  templateUrl: './inline-simpletooltip.component.html',
  styleUrls: ['./creator.css']
})
export class SimpleInlineTooltip implements OnInit {

  @Input() currentRow: string;
  @Input() currentObjectType: string;
  @Output() addRowEvent = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  public setRowType(rowType: string) {
    this.addRowEvent.next({ row: this.currentRow, type: rowType });
  }

}
