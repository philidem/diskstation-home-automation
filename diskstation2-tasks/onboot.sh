#!/bin/sh

# Abort on error
set -e

echo 'Running diskstation2-tasks onboot.sh...'

TASK_DIR='/volume1/Gates-Idem/HomeAutomation/diskstation-home-automation/diskstation2-tasks/'

cd ${TASK_DIR}
node .

echo 'Finished running diskstation2-tasks onboot.sh'