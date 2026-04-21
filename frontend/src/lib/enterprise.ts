export type EnterpriseLogEvent = {
  type: 'operator_alert' | 'session_key_usage' | 'rpc_retry' | 'profitability_snapshot';
  code?: string;
  latencyMs?: number;
  profitability?: number;
  rpcLabel?: string;
  retries?: number;
  message: string;
};

export function enterpriseLog(event: EnterpriseLogEvent) {
  // eslint-disable-next-line no-console
  console.info('[enterprise-log]', event);
}

export function operatorAlert(code: string, message: string, latencyMs?: number) {
  enterpriseLog({ type: 'operator_alert', code, latencyMs, message });
}

export function logRpcRetry(rpcLabel: string, retries: number) {
  enterpriseLog({ type: 'rpc_retry', rpcLabel, retries, message: `RPC ${rpcLabel} retried ${retries} time(s)` });
}
