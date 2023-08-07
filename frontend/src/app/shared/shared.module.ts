import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration/duration.pipe';

@NgModule({
  declarations: [DurationPipe],
  imports: [CommonModule],
  exports: [DurationPipe],
})
export class SharedModule {}
