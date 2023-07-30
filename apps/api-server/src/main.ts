import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  isDevelop,
  isLocal,
  ResponseInterceptor,
  setupSwagger,
} from '@app/common';
import * as fs from 'fs';
import { ApiServerModule } from './api-server.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiServerModule);
  const port = 3000;
  const file = './package.json';
  const packageJsonData = JSON.parse(fs.readFileSync(file, 'utf8'));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use('/ping', async function (req: any, res: any) {
    res.status(200).send('ok');
  });

  app.use((req, res, next) => {
    res.header('X-Powered-By', 'classing');
    next();
  });

  app['all']('/robots.txt', function (req, res) {
    res.status(HttpStatus.OK).send('user-agent: *\nDisallow: /');
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  if (isLocal() || isDevelop()) {
    setupSwagger(app);
  }

  await app.listen(port);

  if (isLocal()) {
    console.log(`✅ api-server ready at http://localhost:${port}`);
    console.log(
      `✅ api-server swagger ready at http://localhost:${port}/${packageJsonData.version}/docs`,
    );
  }
}
bootstrap();
