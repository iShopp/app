import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Validate required environment variables after ConfigModule has loaded
  // (including values from a local .env file) so that dev/test setups work
  // without exporting vars in the shell.
  const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
  const missing = requiredEnvVars.filter((key) => !configService.get<string>(key));
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Set them before starting the application.',
    );
  }

  app.use(helmet());
  app.use(compression());

  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const allowedOrigins: string[] = [];
  if (frontendUrl) allowedOrigins.push(frontendUrl);
  if (!isProduction) {
    allowedOrigins.push('http://localhost:3000', 'http://localhost:5173');
  }

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('iSHOP NEON FX API')
    .setDescription('iSHOP NEON FX Marketplace Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);
  console.log(`Application running on port ${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during application startup:', err);
  process.exit(1);
});
