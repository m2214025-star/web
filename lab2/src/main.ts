import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // СНАЧАЛА устанавливаем глобальный префикс
    app.setGlobalPrefix('/api');

    // ПОТОМ настраиваем Swagger
    const config = new DocumentBuilder()
        .setTitle('Polyclinic API')
        .setDescription('API для управления поликлиникой')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api_docs', app, document);

    await app.listen(3001);
    console.log('Server started on http://localhost:3001');
    console.log('Swagger docs: http://localhost:3001/api_docs');
}
bootstrap();
