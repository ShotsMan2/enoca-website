import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('revalidate')
  async revalidate(@Body('tag') tag: string) {
    try {
        const res = await fetch(`http://localhost:3001/api/revalidate?tag=${tag}`, {
            method: 'POST'
        });
        const data = await res.json();
        return { success: true, nextjs: data };
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
  }
}
