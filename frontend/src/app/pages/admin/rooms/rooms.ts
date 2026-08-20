import { Component, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rooms, Room, RoomInput } from '../../../services/rooms';

@Component({
  selector: 'app-admin-rooms',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class RoomsAdminComponent {
  rooms: Room[] = [];

  loading = false;
  error = '';
  success = '';

  showForm = false;
  editingRoom: Room | null = null;

  form: RoomInput = {
    name: '',
    description: '',
    price: 0,
    status: 'AVAILABLE',
    size: '',
  };

  constructor(
  private roomsService: Rooms,
  private cdr: ChangeDetectorRef
) {
  this.loadRooms();
}

  loadRooms(): void {
  this.loading = true;
  this.error = '';

  this.roomsService.getRooms().subscribe({
    next: (response) => {
      console.log('ADMIN ROOMS RESPONSE:', response);
      console.log('ADMIN ROOMS DATA:', response.data);

      this.rooms = response.data;
      this.loading = false;

      console.log('ROOMS SET:', this.rooms);

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error('Gagal mengambil kamar:', error);

      this.rooms = [];

      this.error =
        error?.error?.message ||
        'Gagal mengambil data kamar.';

      this.loading = false;

      this.cdr.detectChanges();
    },
  });
}

  openCreateForm(): void {
  this.editingRoom = null;

  this.form = {
    name: '',
    description: '',
    price: 0,
    status: 'AVAILABLE',
    size: '',
  };

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
  }, 0);
}

  openEditForm(room: Room): void {
    this.editingRoom = room;

    this.form = {
      name: room.name,
      description: room.description,
      price: Number(room.price),
      status: room.status,
      size: room.size,
    };

    this.error = '';
    this.success = '';
    this.showForm = true;

    this.showForm = true;

setTimeout(() => {
  document
    .querySelector('.form-card')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
}, 0);
  }

  closeForm(): void {
    this.showForm = false;
    this.editingRoom = null;
  }

  saveRoom(): void {
    if (
      !this.form.name ||
      !this.form.price ||
      !this.form.status
    ) {
      this.error = 'Nama, harga, dan status wajib diisi.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const request$ = this.editingRoom
      ? this.roomsService.updateRoom(
          this.editingRoom.id,
          this.form
        )
      : this.roomsService.createRoom(this.form);

    request$.subscribe({
      next: (response) => {
        this.success = response.message;
        this.closeForm();
        this.loadRooms();
      },
      error: (error) => {
        console.error('Gagal menyimpan kamar:', error);
        this.error =
          error?.error?.message ||
          'Gagal menyimpan data kamar.';
        this.loading = false;
      },
    });
  }

  deleteRoom(room: Room): void {
    const confirmed = confirm(
      `Yakin ingin menghapus kamar "${room.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.roomsService.deleteRoom(room.id).subscribe({
      next: (response) => {
        this.success = response.message;
        this.loadRooms();
      },
      error: (error) => {
        console.error('Gagal menghapus kamar:', error);
        this.error =
          error?.error?.message ||
          'Gagal menghapus kamar.';
        this.loading = false;
      },
    });
  }
}