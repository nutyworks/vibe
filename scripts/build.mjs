import { execSync } from 'child_process';
import { existsSync, mkdirSync, renameSync, rmSync, readdirSync, cpSync } from 'fs';
import { join } from 'path';

const rootDist = 'dist';

// 1. Clean and prepare root dist
console.log('Cleaning old dist...');
if (existsSync(rootDist)) {
  rmSync(rootDist, { recursive: true, force: true });
}

const run = (cmd, cwd) => {
  console.log(`\n--- Running: ${cmd} in ${cwd || '.'} ---`);
  execSync(cmd, { stdio: 'inherit', cwd });
};

// 2. Build and Move the Hub (vibe.nuty.works/)
run('npm run build', 'apps/hub');
// Move the entire dist folder to be the root dist
renameSync('apps/hub/dist', rootDist);

// 3. Build and Move each Vibe (vibe.nuty.works/<vibe_name>/)
const vibesDir = 'vibes';
if (existsSync(vibesDir)) {
  const vibes = readdirSync(vibesDir).filter(f => !f.startsWith('.'));

  for (const vibe of vibes) {
    const vibePath = join(vibesDir, vibe);
    if (existsSync(join(vibePath, 'package.json'))) {
      run('npm run build', vibePath);
      // Move the vibe's dist into a subfolder of the root dist
      renameSync(join(vibePath, 'dist'), join(rootDist, vibe));
    }
  }
}

console.log('\n✅ Build complete! Final structure in "dist/":');
execSync(`ls -F ${rootDist}`, { stdio: 'inherit' });
