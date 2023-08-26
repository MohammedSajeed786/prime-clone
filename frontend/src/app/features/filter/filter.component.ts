import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../search/search.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() filterData!: Filter;
  @Output() filterEvent = new EventEmitter();
  showList = false;
  selectChanged(selectedItem: any) {
    this.filterEvent.emit(selectedItem);
    this.showList = !this.showList;
  }
}
