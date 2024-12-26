import { NestFactory } from '@nestjs/core';
import { TasksystemApiGatewayModule } from './tasksystem-api-gateway.module';
import { Session } from 'inspector/promises';
import { writeFile } from 'fs/promises';
import { tracingService } from './logger/tracing.service';

function cpuProfiling() {
  let _session
  return {
    async start() {
      _session = new Session()
      _session.connect()

      await _session.post('Profiler.enable')
      await _session.post('Profiler.start')
      console.log('started CPU Profiling')
    },
    async stop() {
      console.log('stopping CPU Profiling')
      const {profile} = await _session.post('Profiler.stop')
      const profileName = `cpu-profiler-${Date.now()}.cpuprofile`
      await writeFile(profileName, JSON.stringify(profile))
      _session.disconnect()
    },
  }
}

async function bootstrap() {
  await tracingService.start()
  const app = await NestFactory.create(TasksystemApiGatewayModule);
  app.enableCors({
     origin: "*"
  })
  await app.listen(process.env.port ?? 3000);
}


bootstrap();
const { start, stop } = cpuProfiling()
start()
const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
exitSignals.forEach(signal => {
  process.once(signal, async () => {
    await stop()
    process.exit(0)
  })
})