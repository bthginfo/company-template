export type ProvisionErrorResponse = {
  status: number;
  body: {
    error: string;
    category: 'validation' | 'configuration' | 'vercel' | 'database' | 'unknown';
    provisioningLog?: string[];
  };
};

export function provisionErrorResponse(error: unknown, provisioningLog: string[] = []): ProvisionErrorResponse {
  const message = error instanceof Error ? error.message : String(error || 'Provisioning failed');
  const log = provisioningLog.slice(-30);
  if (
    message.includes('Slug muss') ||
    message.includes('reserviert') ||
    message.includes('Anzeigename') ||
    message.includes('Template ung') ||
    message.includes('Style ung')
  ) {
    return { status: 400, body: { error: message, category: 'validation', provisioningLog: log } };
  }
  if (
    message.includes('env var not set') ||
    message.includes('AUTH_SECRET') ||
    message.includes('Plaintext') ||
    message.includes('ciphertext')
  ) {
    return { status: 503, body: { error: message, category: 'configuration', provisioningLog: log } };
  }
  if (message.includes('Vercel API') || message.includes('Deployment ') || message.includes('Vercel project')) {
    return { status: 502, body: { error: message, category: 'vercel', provisioningLog: log } };
  }
  if (message.includes('duplicate key') || message.includes('relation') || message.includes('POSTGRES')) {
    return { status: 500, body: { error: message, category: 'database', provisioningLog: log } };
  }
  return { status: 500, body: { error: message || 'Provisioning failed', category: 'unknown', provisioningLog: log } };
}
