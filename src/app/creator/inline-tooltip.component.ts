import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'blog-tooltip',
    templateUrl: './inline-tooltip.component.html',
    styleUrls: ['./creator.css']
})
export class CreateInlineTooltip implements OnInit {

    @Input() currentRow: string;
    @Output() addRowEvent = new EventEmitter<object>();

    constructor() { }

    ngOnInit() {
    }

    public setRowType(rowType: string) {
      this.addRowEvent.next({ row: this.currentRow, type: rowType });
    }

}
