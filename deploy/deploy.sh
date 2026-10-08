#!/bin/bash
# CharteredONE app — auto-deploy for app.charteredone.com (InMotion / cPanel).
#
# Runs from cron every few minutes. If GitHub's `web-build` branch has a new build,
# it copies it into the website folder. Nothing happens when there's nothing new.
#
# Installed on the server as ~/charteredone-deploy.sh. Log: ~/charteredone-deploy.log
#
# Settings (can be overridden in the cron line):
REPO="${REPO:-https://github.com/shivam4srtech/charteredweb.git}"
BRANCH="${BRANCH:-web-build}"
WEB="${WEB:-$HOME/app.charteredone.com-next}"     # document root of app.charteredone.com
GIT_DIR="${GIT_DIR:-$HOME/.charteredone-app.git}"  # kept outside the website folder
LOG="${LOG:-$HOME/charteredone-deploy.log}"
export GIT_DIR

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $*" >> "$LOG"; }

# one run at a time
exec 9>"$HOME/.charteredone-deploy.lock"
flock -n 9 || exit 0

[ -d "$GIT_DIR" ] || git init -q --bare "$GIT_DIR"
if ! git fetch -q --depth 1 "$REPO" "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH" 2>>"$LOG"; then
  log "fetch failed"
  exit 1
fi

NEW=$(git rev-parse "refs/remotes/origin/$BRANCH")
OLD=$(git rev-parse -q --verify HEAD 2>/dev/null || true)
[ "$NEW" = "$OLD" ] && [ "$1" != "--force" ] && exit 0

mkdir -p "$WEB"
git --work-tree="$WEB" reset -q --hard "$NEW" || { log "checkout failed"; exit 1; }
# remove files that are no longer part of the build (keep SSL validation + cPanel folders)
git --work-tree="$WEB" clean -q -f -d -e .well-known -e cgi-bin
git update-ref HEAD "$NEW" 2>/dev/null || true

log "deployed $(cat "$WEB/BUILD_ID.txt" 2>/dev/null | cut -c1-7) (${NEW:0:7})"
