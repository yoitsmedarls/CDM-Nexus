import type { SessionValidationResult } from '$lib/server/api/auth';

declare global {
  namespace App {
    interface Locals {
      user: SessionValidationResult['user'];
      session: SessionValidationResult['session'];
    }
  }
}

export {};
