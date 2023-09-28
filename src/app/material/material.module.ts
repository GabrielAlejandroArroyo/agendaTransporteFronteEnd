import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { CustomMatPaginatorCast } from './CustomMatPaginatorCast';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

//Componentes
import { DialogComentarioComponent } from './components/dialog-comentario/dialog-comentario.component';
import { DialogSiNoComponent } from './components/dialog-sino/dialog-sino.component';

@NgModule({
  declarations: [
    DialogComentarioComponent,
    DialogSiNoComponent,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorCast
  }]
})
export class MaterialModule { }
