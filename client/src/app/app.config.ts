import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {SocialAuthServiceConfig, GoogleLoginProvider} from '@abacritt/angularx-social-login'
import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideToastr} from "ngx-toastr";
import {GOOGLE_CLIENT_ID} from "../dotenv";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              GOOGLE_CLIENT_ID
            )
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig
    }
  ]
};
