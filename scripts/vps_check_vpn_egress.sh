#!/usr/bin/env bash
# Run ON the VPS after VPN is connected.
# Traffic from "ssh -D" on your laptop exits the VPS using this route.
set -euo pipefail

say() { echo "$*"; }

say "=== VPS egress check (local -> VPS -> VPN) ==="
say

say "Default route:"
ip -4 route show default 2>/dev/null || route -n 2>/dev/null | head -5 || true
say

say "Public IP as seen from this VPS (should be VPN IP, not datacenter IP):"
if command -v curl >/dev/null; then
  curl -fsS --max-time 15 https://ifconfig.me/ip || curl -fsS --max-time 15 https://api.ipify.org || true
  echo
else
  say "curl not installed"
fi
say

if [[ -n "${WHMCS_EXPECTED_EGRESS_IP:-}" ]]; then
  current="$(curl -fsS --max-time 15 https://ifconfig.me/ip 2>/dev/null || true)"
  if [[ "$current" == "$WHMCS_EXPECTED_EGRESS_IP" ]]; then
    say "OK: egress matches WHMCS_EXPECTED_EGRESS_IP=$WHMCS_EXPECTED_EGRESS_IP"
  else
    say "WARN: egress is '$current', expected '$WHMCS_EXPECTED_EGRESS_IP'" >&2
    exit 1
  fi
fi

say
say "If IP is still the VPS datacenter IP, connect VPN on this host first"
say "(WireGuard/OpenVPN as default route, or SOCKS on VPS — see run_whmcs_chain_local_vps_vpn.sh)."
