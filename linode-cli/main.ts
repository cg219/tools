import { load } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import { join } from "https://deno.land/std@0.170.0/path/mod.ts";

if (import.meta.main) {
  await load({
    envPath: join(Deno.env.get('HOME')!, '.config', 'linode-cli', '.env'),
    export: true,
    restrictEnvAccessTo: 'LINODE_TOKEN',
    examplePath: '',
    defaultsPath: ''
  });

  const token = Deno.env.get('LINODE_TOKEN')!;
  const args = Deno.args.length > 1 ? ' '.concat(Deno.args.join(' ')) : '';
  const cmd = `docker run --rm -it -e LINODE_CLI_TOKEN=${token} linode/cli:latest${args}`.split(' ');
  const pid = Deno.run({ cmd });

  await pid.status();
}
