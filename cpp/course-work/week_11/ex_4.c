#include <stdio.h>
#include <time.h>

int main() {

    time_t start_time, end_time;
    double diff_seconds;

    printf("Running task...\n");

    start_time = time(NULL);

    for (unsigned long i = 0; i < 10000000000; i++) {
    }

    end_time = time(NULL);

    diff_seconds = difftime(end_time, start_time);

    printf("Task completed.\n");
    printf("Execution time: %.2f seconds\n", diff_seconds);

    return 0;
}