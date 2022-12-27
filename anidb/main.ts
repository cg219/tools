import { load } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import { join } from "https://deno.land/std@0.170.0/path/mod.ts";

if (import.meta.main) {
  const crt = join(Deno.env.get('HOME')!, '.config', 'anidb');
  const args = Deno.args.length > 1 ? ' '.concat(Deno.args.join(' ')) : '';
  const cmd = `docker run --rm -it --platform linux/amd64 -v ${crt}:/anidb/certs anidb-cli:1${args}`.split(' ');
  const pid = Deno.run({ cmd });

  await pid.status();
}
