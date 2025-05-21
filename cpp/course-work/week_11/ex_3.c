#include <stdio.h>
#include <time.h>

int main () {

    time_t now = time(NULL);
    struct tm *local = localtime(&now);

    printf("Current Time (by struct tm):\n");
    printf("--Year: %d\n", local->tm_year + 1900);
    printf("--Month: %d\n", local->tm_mon + 1);
    printf("--Day: %d\n", local->tm_mday);
    printf("--Hour: %d\n", local->tm_hour);
    printf("--Minute: %d\n", local->tm_min);
    printf("--Second: %d\n", local->tm_sec);

    char buffer[80];
    strftime(buffer, 80, "%A, %B %d, %Y %H:%M:%S", local);

    printf("\nFormatted Time:\n%s", buffer);

    return 0;
}