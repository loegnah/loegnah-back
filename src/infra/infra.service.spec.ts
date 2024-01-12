import { infraModuleMeta } from '#/infra/infra.module';
import { makeTestingModule } from '#test/lib/test.run';
import { InfraService } from './infra.service';

describe('InfraService', () => {
  let infraSrv: InfraService;

  beforeEach(async () => {
    const module = await makeTestingModule(infraModuleMeta);
    infraSrv = module.get<InfraService>(InfraService);
  });

  it('getPublicIp', async () => {
    const publicIp = await infraSrv.getPublicIp();
    expect(publicIp).toBeTruthy();
    expect(publicIp.length).toBeGreaterThan(7);
  });
});
