import { ConfigService } from './services/config.service';

export function appInitializer(configService: ConfigService): () => Promise<void> {
  return () =>
    configService.loadConfig().toPromise().then((data) => {
      console.log('Config loaded during initialization:', data);
      configService.setConfig(data);
    });
}
