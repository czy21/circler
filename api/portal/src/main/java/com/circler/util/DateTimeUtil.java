package com.circler.util;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;


public class DateTimeUtil {

    public static Long toTimeStamp(LocalDateTime localDateTime) {
        return TimeUnit.SECONDS.toMicros(localDateTime.atZone(ZoneId.systemDefault()).toEpochSecond()) + TimeUnit.NANOSECONDS.toMicros(localDateTime.getNano());
    }

    public static LocalDateTime toLocalDateTime(Long timeStamp) {
        String tStr = timeStamp.toString();
        if (tStr.length() == 16) {
            return LocalDateTime.ofInstant(Instant.ofEpochSecond(
                    TimeUnit.NANOSECONDS.toSeconds(timeStamp),
                    (timeStamp % 1_000_000_000L)), ZoneId.systemDefault());
        }
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(timeStamp), ZoneId.systemDefault());
    }

    public static Long toTimeStamp(LocalDate localDate) {
        return TimeUnit.SECONDS.toMicros(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant().getEpochSecond());
    }

    public static LocalDate toLocalDate(Long timeStamp) {
        String tStr = timeStamp.toString();
        if (tStr.length() == 16) {
            return LocalDate.ofInstant(Instant.ofEpochMilli(timeStamp / 1_000).plus(timeStamp % 1_000, ChronoUnit.MICROS), ZoneId.systemDefault());
        }
        return LocalDate.ofInstant(Instant.ofEpochMilli(timeStamp), ZoneId.systemDefault());
    }
}
