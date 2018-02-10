import { NgModule } from '@angular/core';
import { NemValuePipe } from './nem-value/nem-value';
import { RemovezeroPipe } from './removezero/removezero';
import { FmtImportanceScorePipe } from './fmt-importance-score/fmt-importance-score';
import { FmtNemDatePipe } from './fmt-nem-date/fmt-nem-date';
@NgModule({
	declarations: [
    NemValuePipe,
    RemovezeroPipe,
    FmtImportanceScorePipe,
    FmtNemDatePipe],
	imports: [],
	exports: [
    NemValuePipe,
    RemovezeroPipe,
    FmtImportanceScorePipe,
    FmtNemDatePipe]
})
export class PipesModule {}
