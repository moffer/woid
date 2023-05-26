#ifndef __DEFINES
#define __DEFINES
#include <Arduino.h>

#define SYNC_TIME 5000

typedef struct {
    long latitude;
    long longitude;
    boolean synced;
} coordinates;

typedef struct {
    bool lock;
    bool alarm;
} command;

#endif