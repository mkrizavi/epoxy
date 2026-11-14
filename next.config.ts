import type { NextConfig } from 'next';
// Use the compiler API: the CLI child-process output is unavailable in this host.
const nextConfig:NextConfig={experimental:{useTypeScriptCli:false,cpus:1}};
export default nextConfig;
