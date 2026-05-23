---
title: Drivers
---

Download and install Virtual COM Port (VCP) [drivers][drivers] on your computer. Next, connect your USB to UART bridge and run the following commands in the terminal:

```sh
# List available devices
ls /dev/cu.*

# Multiplex into the processes running on the device
screen /dev/cu.SLAB_USBtoUART 115200 8N1
```

**Note** You might have to replace `SLAB_USBtoUART` with the name of your device!

[drivers]: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
