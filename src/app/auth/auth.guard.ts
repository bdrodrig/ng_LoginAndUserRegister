import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  // Aquí puedes implementar la lógica para verificar si el usuario está autenticado

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true; // Permitir acceso a la ruta
  }

  return router.parseUrl('/login'); // Redirigir al login si no está autenticado
}
