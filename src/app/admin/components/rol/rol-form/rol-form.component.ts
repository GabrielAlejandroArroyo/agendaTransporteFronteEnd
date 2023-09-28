import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

// services
import { RolService } from '@app/core/services/rol.service';

@Component({
  selector: 'app-role-form',
  styleUrls: ['./rol-form.component.scss'],
  templateUrl: './rol-form.component.html',
})
export class RolFormComponent implements OnInit {
  public isAddMode: boolean;
  public isViewMode: boolean;
  public form: FormGroup;
  public id: string;

  constructor(
    private formBuilder: FormBuilder,
    private  rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.buildForm();
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.rolService.getById(this.id)
          .pipe(first())
          .subscribe(
              (rol) => this.form.patchValue(rol),
              (error) => console.log("rol-form.component => ERROR => " + error)
          );
    }

  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      idRol: 0,
      timeStamp: '',
    });
  }

  public saveRol(event: Event): void {
    event.preventDefault();

    if (this.form.valid) {

      const rol = this.form.value;

      if (this.isAddMode === true) { //ALTA
        this.rolService.create(rol).subscribe(
          (NewRol) => {
            //console.log("rol-form.component => " + NewRol);
            this.router.navigate(['/admin/roles'],
            { relativeTo: this.route });
          },
          (error) => {
            console.log("rol-form.component => ERROR => " + error);
            throw error;
          });

      } else { //MODIFICACION
        this.rolService.update(rol).subscribe(
        (NewRol) => {
          //console.log("rol-form.component => " + NewRol);
          this.router.navigate(['/admin/roles'],
          { relativeTo: this.route });
        },
        (error) => {
          console.log("rol-form.component => ERROR => " + error);
          throw error;
        });
      }
    }
  }


  public get descripcionField(): any {
      return this.form.get('descripcion');
  }

}
