import {
  Component,
  ChangeDetectorRef,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Facilities,
  Facility,
  FacilityInput,
} from '../../../services/facilities';

@Component({
  selector: 'app-admin-facilities',
  imports: [FormsModule],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class FacilitiesAdminComponent {
  facilities: Facility[] = [];

  loading = false;
  error = '';
  success = '';

  showForm = false;
  editingFacility: Facility | null = null;

  form: FacilityInput = {
    name: '',
    description: '',
    icon: '',
  };

  constructor(
    private facilitiesService: Facilities,
    private cdr: ChangeDetectorRef
  ) {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.loading = true;
    this.error = '';

    this.facilitiesService.getFacilities().subscribe({
      next: (response) => {
        console.log(
          'ADMIN FACILITIES RESPONSE:',
          response
        );

        console.log(
          'ADMIN FACILITIES DATA:',
          response.data
        );

        this.facilities = response.data;

        this.loading = false;

        console.log(
          'FACILITIES SET:',
          this.facilities
        );

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Gagal mengambil fasilitas:',
          error
        );

        this.facilities = [];

        this.error =
          error?.error?.message ||
          'Gagal mengambil data fasilitas.';

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  openCreateForm(): void {
    this.editingFacility = null;

    this.form = {
      name: '',
      description: '',
      icon: '',
    };

    this.error = '';
    this.success = '';
    this.showForm = true;
  }

  openEditForm(
    facility: Facility
  ): void {
    this.editingFacility = facility;

    this.form = {
      name: facility.name,
      description: facility.description,
      icon: facility.icon,
    };

    this.error = '';
    this.success = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingFacility = null;
  }

  saveFacility(): void {
    if (!this.form.name.trim()) {
    this.error = 'Nama fasilitas wajib diisi.';
    return;
    }

    if (!this.form.icon) {
    this.error = 'Silakan pilih icon fasilitas.';
    return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const request$ =
      this.editingFacility
        ? this.facilitiesService.updateFacility(
            this.editingFacility.id,
            this.form
          )
        : this.facilitiesService.createFacility(
            this.form
          );

    request$.subscribe({
      next: (response) => {
        this.success = response.message;

        this.closeForm();

        this.loadFacilities();
      },

      error: (error) => {
        console.error(
          'Gagal menyimpan fasilitas:',
          error
        );

        this.error =
          error?.error?.message ||
          'Gagal menyimpan data fasilitas.';

        this.loading = false;
      },
    });
  }

  deleteFacility(
    facility: Facility
  ): void {
    const confirmed = confirm(
      `Yakin ingin menghapus fasilitas "${facility.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.facilitiesService
      .deleteFacility(facility.id)
      .subscribe({
        next: (response) => {
          this.success =
            response.message;

          this.loadFacilities();
        },

        error: (error) => {
          console.error(
            'Gagal menghapus fasilitas:',
            error
          );

          this.error =
            error?.error?.message ||
            'Gagal menghapus fasilitas.';

          this.loading = false;
        },
      });
  }
}