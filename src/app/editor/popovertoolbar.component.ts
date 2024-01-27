import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'ha-popover',
  templateUrl: './popovertoolbar.component.html',
  styleUrls: ['./hansinieditor.css']
})
export class PopoverToolBar implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("s PopoverToolBar " + JSON.stringify(changes));
  }

  @Input() icon: string;
  @Input() isActive = false;
  @Output()  typeSelected = new EventEmitter<string>();

  toggle() {
   // this.isActive = !this.isActive;
  }

  selectItem(item:string) {
   
    this.typeSelected.emit(item);
  }
}