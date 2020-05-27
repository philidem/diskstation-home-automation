# Diskstation Home Automation

This project contains shell and Node.js scripts that run on a Diskstation to
automate certain tasks within my home network. This code is being shared for
informational purposes and might not work with your Diskstation model or
other devices on your network.

**NOTE:** The code in `diskstation2-tasks` directory contains Node.js
scripts that are intended to runs on a DS213. The DS213 model is fairly
outdated and can only run Node.js v0.10 so the `*.js` files do not leverage
latest language features.

## Task Scheduler

The Diskstation scripts can be triggered by the Diskstation Task Scheduler
using a **User-defined script** similar to the following:

```
mkdir -p /var/log/diskstation2-tasks/
/volume1/diskstation-home-automation/diskstation2-tasks/onboot.sh >> /var/log/diskstation2-tasks/onboot.log
```

## Amcrest Cameras

`diskstation2-tasks/amcrestCameras.js` contains some code that synchronizes
the clock of Amcrest cameras.

Create a `diskstation2-tasks/.env` file with these properties:

```ini
AMCREST_CAMERA_IP_ADDRESSES=192.168.0.1,192.168.0.2
AMCREST_CAMERA_USERNAME=
AMCREST_CAMERA_PASSWORD=
```

If you're interested in learning more about the Amcrest HTTP API SDK then visit:

https://support.amcrest.com/hc/en-us/articles/360002007371-Amcrest-HTTP-API-SDK

**Example usage:**

```javascript
require("dotenv").config();

var amcrestCameras = require("./amcrestCameras");
amcrestCameras.setClocks();
```
