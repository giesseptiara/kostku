import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Gallery,
  GalleryItem,
  GalleryInput,
} from '../../../services/gallery';

@Component({
  selector: 'app-admin-gallery',
  imports: [FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryAdminComponent {
    @ViewChild('galleryForm')
galleryForm!: ElementRef<HTMLElement>;
  gallery: GalleryItem[] = [];
previewUrl = '';

  loading = false;
  error = '';
  success = '';

  showForm = false;
  editingGallery: GalleryItem | null = null;
  selectedFile: File | null = null;

  form: GalleryInput = {
    title: '',
    image_url: '',
    description: '',
  };

  constructor(
    private galleryService: Gallery,
    private cdr: ChangeDetectorRef
  ) {
    this.loadGallery();
  }

  loadGallery(): void {
    this.loading = true;
    this.error = '';

    this.galleryService.getGallery().subscribe({
      next: (response) => {
        console.log('ADMIN GALLERY RESPONSE:', response);
        console.log('ADMIN GALLERY DATA:', response.data);

        this.gallery = response.data;

        console.log('GALLERY SET:', this.gallery);

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Gagal mengambil gallery:',
          error
        );

        this.gallery = [];

        this.error =
          error?.error?.message ||
          'Gagal mengambil data gallery.';

        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  openCreateForm(): void {
  this.editingGallery = null;

  this.form = {
    title: '',
    image_url: '',
    description: '',
  };

  this.selectedFile = null;

  this.error = '';
  this.success = '';
  this.showForm = true;

  setTimeout(() => {
    document
      .querySelector('.form-card')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  });
}

  openEditForm(item: GalleryItem): void {
  this.editingGallery = item;

  this.form = {
    title: item.title,
    image_url: item.image_url,
    description: item.description,
  };

  this.selectedFile = null;
  this.previewUrl = '';

  this.error = '';
  this.success = '';
  this.showForm = true;

  setTimeout(() => {
    document
      .querySelector('.form-card')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  });
}

  closeForm(): void {
  this.showForm = false;
  this.editingGallery = null;
  this.selectedFile = null;
  this.previewUrl = '';
}

  saveGallery(): void {
  if (!this.form.title.trim()) {
    this.error = 'Judul gallery wajib diisi.';
    return;
  }

  if (!this.editingGallery && !this.selectedFile) {
    this.error = 'Foto wajib dipilih.';
    return;
  }

  this.loading = true;
  this.error = '';
  this.success = '';

  if (this.selectedFile) {
    this.galleryService
      .uploadImage(this.selectedFile)
      .subscribe({
        next: (uploadResponse) => {
          this.form.image_url =
            uploadResponse.data.image_url;

          this.saveGalleryData();
        },

        error: (error) => {
          console.error(
            'Gagal upload gambar:',
            error
          );

          this.error =
            error?.error?.message ||
            'Gagal mengupload gambar.';

          this.loading = false;
        },
      });

    return;
  }

  this.saveGalleryData();
}

  deleteGallery(item: GalleryItem): void {
    const confirmed = confirm(
      `Yakin ingin menghapus "${item.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.galleryService
      .deleteGallery(item.id)
      .subscribe({
        next: (response) => {
          this.success = response.message;

          this.loadGallery();
        },

        error: (error) => {
          console.error(
            'Gagal menghapus gallery:',
            error
          );

          this.error =
            error?.error?.message ||
            'Gagal menghapus gallery.';

          this.loading = false;
        },
      });
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    this.selectedFile = null;
    this.previewUrl = '';
    return;
  }

  this.selectedFile = input.files[0];

  this.previewUrl = URL.createObjectURL(
    this.selectedFile
  );

  this.error = '';
  this.success = '';
}

private saveGalleryData(): void {
  const request$ = this.editingGallery
    ? this.galleryService.updateGallery(
        this.editingGallery.id,
        this.form
      )
    : this.galleryService.createGallery(
        this.form
      );

  request$.subscribe({
    next: (response) => {
      this.success = response.message;

      this.closeForm();

      this.loadGallery();
    },

    error: (error) => {
      console.error(
        'Gagal menyimpan gallery:',
        error
      );

      this.error =
        error?.error?.message ||
        'Gagal menyimpan data gallery.';

      this.loading = false;
    },
  });
}
}