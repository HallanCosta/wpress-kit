#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_BIN="${COMPOSE_BIN:-docker compose}"
WORDPRESS_SERVICE="${WORDPRESS_SERVICE:-wordpress}"
WP_PATH="${WP_PATH:-/var/www/html}"

show_usage() {
  cat <<'EOF'
Usage:
  ./admin-user.sh show
    Prints an administrator user (default: first admin). Optionally set ADMIN_LOGIN to target a specific login.

  ./admin-user.sh set-password <new_password>
    Updates the admin user password (default admin selection same as above).

Environment overrides:
  COMPOSE_BIN       Command to run docker compose (default: "docker compose")
  WORDPRESS_SERVICE Docker compose service name for WordPress (default: "wordpress")
  WP_PATH           WordPress path inside the container (default: "/var/www/html")
  ADMIN_LOGIN       Target login; when empty, the first administrator is used
EOF
}

require_args() {
  if [ "$#" -eq 0 ]; then
    show_usage
    exit 1
  fi
}

ensure_compose_available() {
  if ! command -v ${COMPOSE_BIN%% *} >/dev/null 2>&1; then
    echo "docker compose is required but not found. Install Docker or adjust COMPOSE_BIN." >&2
    exit 1
  fi
}

get_admin_user() {
  local login="${ADMIN_LOGIN:-}"

  ${COMPOSE_BIN} exec -T -e ADMIN_LOGIN="${login}" -e HTTPS="off" "${WORDPRESS_SERVICE}" php -r "
    require '${WP_PATH}/wp-load.php';
    \$targetLogin = getenv('ADMIN_LOGIN');

    if (\$targetLogin) {
      \$user = get_user_by('login', \$targetLogin);
    } else {
      \$admins = get_users([
        'role' => 'administrator',
        'number' => 1,
        'orderby' => 'ID',
        'order' => 'ASC',
      ]);

      \$user = \$admins ? \$admins[0] : null;
    }

    if (!\$user) {
      fwrite(STDERR, \"Administrator user not found\n\");
      exit(1);
    }

    printf(\"ID: %s\nLogin: %s\nEmail: %s\nDisplay name: %s\n\", \$user->ID, \$user->user_login, \$user->user_email, \$user->display_name);
  "
}

set_admin_password() {
  local new_password="$1"
  local login="${ADMIN_LOGIN:-}"

  ${COMPOSE_BIN} exec -T -e NEW_ADMIN_PASSWORD="${new_password}" -e ADMIN_LOGIN="${login}" -e HTTPS="off" "${WORDPRESS_SERVICE}" php -r "
    require '${WP_PATH}/wp-load.php';

    \$targetLogin = getenv('ADMIN_LOGIN');

    if (\$targetLogin) {
      \$user = get_user_by('login', \$targetLogin);
    } else {
      \$admins = get_users([
        'role' => 'administrator',
        'number' => 1,
        'orderby' => 'ID',
        'order' => 'ASC',
      ]);

      \$user = \$admins ? \$admins[0] : null;
    }

    if (!\$user) {
      fwrite(STDERR, \"Administrator user not found\n\");
      exit(1);
    }

    \$password = getenv('NEW_ADMIN_PASSWORD');

    if (!\$password) {
      fwrite(STDERR, \"Password not provided\n\");
      exit(1);
    }

    wp_set_password(\$password, \$user->ID);

    echo \"Admin password updated\n\";
  "
}

main() {
  require_args "$@"
  ensure_compose_available

  case "$1" in
    show)
      get_admin_user
      ;;
    set-password)
      if [ "${2:-}" = "" ]; then
        echo "Missing new password." >&2
        show_usage
        exit 1
      fi

      set_admin_password "$2"
      ;;
    *)
      show_usage
      exit 1
      ;;
  esac
}

main "$@"
