package com.java.myh.cloud.common.utils;

import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 时间操作定义类
 *
 * @author the author
 */
@SuppressWarnings("all")
public class DateUtils extends PropertyEditorSupport {
    public static final SimpleDateFormat date_sdf = new SimpleDateFormat("yyyy-MM-dd");
    public static final SimpleDateFormat yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
    public static final SimpleDateFormat DATE_SDF_WZ = new SimpleDateFormat("yyyy年MM月dd日");
    public static final SimpleDateFormat time_sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    public static final SimpleDateFormat time_sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    public static final SimpleDateFormat YYYY_MM_DD_HH_MM_SS = new SimpleDateFormat("yyyyMMddHHmmss");
    public static final SimpleDateFormat short_time_sdf = new SimpleDateFormat("HH:mm");
    public static final SimpleDateFormat HH_MM_SS = new SimpleDateFormat("HH:mm:ss");
    public static final SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    /**
     * 以毫秒表示的时间
     */
    private static final long DAY_IN_MILLIS = 24 * 3600 * 1000;
    private static final long HOUR_IN_MILLIS = 3600 * 1000;
    private static final long MINUTE_IN_MILLIS = 60 * 1000;
    private static final long SECOND_IN_MILLIS = 1000;

    /**
     * 指定模式的时间格式
     *
     * @param pattern pattern
     * @return format
     */
    private static SimpleDateFormat getSDFormat(String pattern) {
        return new SimpleDateFormat(pattern);
    }

    /**
     * 当前日历，这里用中国时间表示
     */
    public static Calendar getCalendar() {
        return Calendar.getInstance();
    }

    /**
     * 指定毫秒数表示的日历
     */
    public static Calendar getCalendar(long millis) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date(millis));
        return cal;
    }

    /**
     * 时间转字符串
     */
    public static String date2SStr() {
        Date date = getDate();

        return yyyyMMdd.format(date);
    }

    /**
     * 当前日期
     */
    public static Date getDate() {
        return new Date();
    }

    /**
     * 指定毫秒数表示的日期
     */
    public static Date getDate(long millis) {
        return new Date(millis);
    }

    /**
     * 时间戳转换为字符串
     */
    public static String timestamptoStr(Timestamp time) {
        Date date = null;
        if (null != time) {
            date = new Date(time.getTime());
        }
        return date2Str(date_sdf);
    }

    /**
     * 字符串转换时间戳
     */
    public static Timestamp str2Timestamp(String str) {
        Date date = str2Date(str, date_sdf);
        return new Timestamp(date.getTime());
    }

    /**
     * 字符串转换成日期
     */
    public static Date str2Date(String str, SimpleDateFormat sdf) {
        if (null == str || "".equals(str)) {
            return null;
        }
        Date date;
        try {
            date = sdf.parse(str);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 日期转换为字符串
     */
    public static String date2Str(SimpleDateFormat date_sdf) {
        Date date = getDate();

        return date_sdf.format(date);
    }

    /**
     * 格式化时间
     */
    public static String dataformat(String data, String format) {
        SimpleDateFormat sformat = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sformat.parse(data);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return sformat.format(date);
    }

    /**
     * 日期转换为字符串
     */
    public static String date2Str(Date date, SimpleDateFormat date_sdf) {
        if (null == date) {
            return null;
        }
        return date_sdf.format(date);
    }

    /**
     * 日期转换为字符串
     */
    public static String getDate(String format) {
        Date date = new Date();

        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    /**
     * 指定毫秒数的时间戳
     */
    public static Timestamp getTimestamp(long millis) {
        return new Timestamp(millis);
    }

    /**
     * 以字符形式表示的时间戳
     */
    public static Timestamp getTimestamp(String time) {
        return new Timestamp(Long.parseLong(time));
    }

    /**
     * 系统当前的时间戳
     */
    public static Timestamp getTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }

    /**
     * 指定日期的时间戳
     */
    public static Timestamp getTimestamp(Date date) {
        return new Timestamp(date.getTime());
    }

    /**
     * 指定日历的时间戳
     */
    public static Timestamp getCalendarTimestamp(Calendar cal) {
        return new Timestamp(cal.getTime().getTime());
    }

    public static Timestamp gettimestamp() {
        Date dt = new Date();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTime = df.format(dt);
        Timestamp buydate = Timestamp.valueOf(nowTime);
        return buydate;
    }

    /**
     * 系统时间的毫秒数
     */
    public static long getMillis() {
        return System.currentTimeMillis();
    }

    /**
     * 指定日历的毫秒数
     */
    public static long getMillis(Calendar cal) {
        return cal.getTime().getTime();
    }

    /**
     * 指定日期的毫秒数
     */
    public static long getMillis(Date date) {
        return date.getTime();
    }

    /**
     * 指定时间戳的毫秒数
     */
    public static long getMillis(Timestamp ts) {
        return ts.getTime();
    }

    /**
     * 默认方式表示的系统当前日期，具体格式：年-月-日
     */
    public static String formatDate() {
        return date_sdf.format(getCalendar().getTime());
    }

    public static String datetimeFormat() {
        return datetimeFormat.format(getCalendar().getTime());
    }

    /**
     * 获取时间字符串
     */
    public static String getDataString(SimpleDateFormat formatstr) {
        return formatstr.format(getCalendar().getTime());
    }

    /**
     * 指定日期的默认显示，具体格式：年-月-日
     */
    public static String formatDate(Calendar cal) {
        return date_sdf.format(cal.getTime());
    }

    /**
     * 指定日期的默认显示，具体格式：年-月-日
     */
    public static String formatDate(Date date) {
        return date_sdf.format(date);
    }

    /**
     * 指定毫秒数表示日期的默认显示，具体格式：年-月-日
     */
    public static String formatDate(long millis) {
        return date_sdf.format(new Date(millis));
    }

    /**
     * 默认日期按指定格式显示
     */
    public static String formatDate(String pattern) {
        return getSDFormat(pattern).format(getCalendar().getTime());
    }

    /**
     * 指定日期按指定格式显示
     */
    public static String formatDate(Calendar cal, String pattern) {
        return getSDFormat(pattern).format(cal.getTime());
    }

    /**
     * 指定日期按指定格式显示
     */
    public static String formatDate(Date date, String pattern) {
        return getSDFormat(pattern).format(date);
    }

    /**
     * 默认方式表示的系统当前日期，具体格式：年-月-日 时：分
     */
    public static String formatTime() {
        return time_sdf.format(getCalendar().getTime());
    }

    /**
     * 默认方式表示的系统当前日期，具体格式：年-月-日 时：分
     */
    public static String formatTime2() {
        return time_sdf2.format(getCalendar().getTime());
    }

    /**
     * 指定毫秒数表示日期的默认显示，具体格式：年-月-日 时：分
     */
    public static String formatTime(long millis) {
        return time_sdf.format(new Date(millis));
    }

    /**
     * 指定日期的默认显示，具体格式：年-月-日 时：分
     */
    public static String formatTime(Calendar cal) {
        return time_sdf.format(cal.getTime());
    }

    /**
     * 指定日期的默认显示，具体格式：年-月-日 时：分
     */
    public static String formatTime(Date date) {
        return time_sdf.format(date);
    }

    /**
     * 默认方式表示的系统当前日期，具体格式：时：分
     */
    public static String formatShortTime() {
        return short_time_sdf.format(getCalendar().getTime());
    }

    /**
     * 指定毫秒数表示日期的默认显示，具体格式：时：分
     */
    public static String formatShortTime(long millis) {
        return short_time_sdf.format(new Date(millis));
    }

    /**
     * 指定日期的默认显示，具体格式：时：分
     */
    public static String formatShortTime(Calendar cal) {
        return short_time_sdf.format(cal.getTime());
    }

    /**
     * 指定日期的默认显示，具体格式：时：分
     */
    public static String formatShortTime(Date date) {
        return short_time_sdf.format(date);
    }

    /**
     * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
     */
    public static Date parseDate(String src, String pattern)
            throws ParseException {
        return getSDFormat(pattern).parse(src);

    }

    /**
     * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
     */
    public static Date parseDateNoException(String src, String pattern) {
        Date date;
        try {
            date = getSDFormat(pattern).parse(src);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return date;
    }

    /**
     * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
     */
    public static Calendar parseCalendar(String src, String pattern)
            throws ParseException {

        Date date = parseDate(src, pattern);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal;
    }

    public static String formatAddDate(String src, String pattern, int amount)
            throws ParseException {
        Calendar cal;
        cal = parseCalendar(src, pattern);
        cal.add(Calendar.DATE, amount);
        return formatDate(cal);
    }

    /**
     * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
     */
    public static Timestamp parseTimestamp(String src, String pattern)
            throws ParseException {
        Date date = parseDate(src, pattern);
        return new Timestamp(date.getTime());
    }

    /**
     * 计算两个时间之间的差值，根据标志的不同而不同
     */
    public static int dateDiff(char flag, Calendar calSrc, Calendar calDes) {
        long millisDiff = getMillis(calSrc) - getMillis(calDes);
        if (flag == 'y') {
            return (calSrc.get(Calendar.YEAR) - calDes.get(Calendar.YEAR));
        }
        if (flag == 'd') {
            return (int) (millisDiff / DAY_IN_MILLIS);
        }
        if (flag == 'h') {
            return (int) (millisDiff / HOUR_IN_MILLIS);
        }
        if (flag == 'm') {
            return (int) (millisDiff / MINUTE_IN_MILLIS);
        }
        if (flag == 's') {
            return (int) (millisDiff / SECOND_IN_MILLIS);
        }
        return 0;
    }

    public static int dateDiff(char flag, Date timeSrc, Date timeDes) {
        Calendar calSrc = Calendar.getInstance();
        calSrc.setTime(timeSrc);

        Calendar calDes = Calendar.getInstance();
        calSrc.setTime(timeDes);

        long millisDiff = getMillis(calSrc) - getMillis(calDes);
        if (flag == 'y') {
            return (calSrc.get(Calendar.YEAR) - calDes.get(Calendar.YEAR));
        }
        if (flag == 'd') {
            return (int) (millisDiff / DAY_IN_MILLIS);
        }
        if (flag == 'h') {
            return (int) (millisDiff / HOUR_IN_MILLIS);
        }
        if (flag == 'm') {
            return (int) (millisDiff / MINUTE_IN_MILLIS);
        }
        if (flag == 's') {
            return (int) (millisDiff / SECOND_IN_MILLIS);
        }
        return 0;

    }

    public static int getYear() {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(getDate());
        return calendar.get(Calendar.YEAR);
    }

    /**
     * 返回指定日期的月的最后一天
     *
     * @param date
     * @return
     */
    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH), 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }

    /**
     * 获取当前日期是星期几<br>
     *
     * @param dt
     * @return 当前日期是星期几
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekDays[w];
    }

    /**
     * 获取当前日期是星期几 ,返回的是英文的单词<br>
     *
     * @param dt
     * @return 当前日期是星期几
     */
    public static String getWeekOfDateEn(Date dt) {
        String[] weekDays = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekDays[w];
    }

    /**
     * 获得改日期明天的日期
     *
     * @param date
     * @return
     */
    public static Date getTomorrowDate(Date date, int day) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        //把日期往后增加一天.整数往后推,负数往前移动
        calendar.add(Calendar.DATE, day);
        //这个时间就是日期往后推一天的结果
        date = calendar.getTime();
        return date;
    }

    /**
     * 获取指定日期  day天后的开始时间
     *
     * @param date
     * @param day
     * @return
     */
    public static Date getAFewDaysStartDate(Date date, int day) {

        return getDayStartTime(getTomorrowDate(date, day));
    }

    /**
     * 获取指定日期  day天后的开始时间
     *
     * @param timeMillis
     * @param day
     * @return
     */
    public static Date getTomorrowStartDate(Long timeMillis, int day) {
        return getDayStartTime(getTomorrowDate(new Date(timeMillis), day));
    }

    /**
     * 获取昨天的开始时间
     *
     * @param timeMillis
     * @return
     */
    public static Date getYesterdayStartDate(Long timeMillis) {
        Calendar todayStart = Calendar.getInstance();
        todayStart.setTimeInMillis(timeMillis);
        todayStart.set(Calendar.DATE, todayStart.get(Calendar.DATE) - 1);
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);
        todayStart.set(Calendar.SECOND, 0);
        todayStart.set(Calendar.MILLISECOND, 0);
        return todayStart.getTime();
    }

    /**
     * 获取昨天的结束时间
     *
     * @param timeMillis
     * @return
     */
    public static Date getYesterdayEndDate(Long timeMillis) {
        Calendar todayStart = Calendar.getInstance();
        todayStart.setTimeInMillis(timeMillis);
        todayStart.set(Calendar.DATE, todayStart.get(Calendar.DATE) - 1);
        todayStart.set(Calendar.HOUR_OF_DAY, 23);
        todayStart.set(Calendar.MINUTE, 59);
        todayStart.set(Calendar.SECOND, 59);
        todayStart.set(Calendar.MILLISECOND, 0);
        return todayStart.getTime();
    }

    /**
     * 获取指定天数后的 日期结束时间
     *
     * @param timeMillis
     * @param day
     * @return
     */
    public static Date getTomorrowEndDate(Long timeMillis, int day) {
        return getDayEndMaxTime(getTomorrowDate(new Date(timeMillis), day));
    }

    /**
     * 获取指定天数后的 日期结束时间
     *
     * @param date
     * @param day
     * @return
     */
    public static Date getTomorrowEndDate(Date date, int day) {
        return getDayEndMaxTime(getTomorrowDate(date, day));
    }

    /**
     * 获得改日期几天后是星期几
     *
     * @param date
     * @return
     */
    public static String getTomorrowWeek(Date date, int day) {
        return getWeekOfDate(getTomorrowDate(date, day));
    }

    /**
     * 在原有的时间上加上几分钟，获得新的时间
     *
     * @param date
     * @param minute
     * @return
     */
    public static Date addMinute(Date date, int minute) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, minute);
        date = cal.getTime();
        return date;
    }

    /**
     * 比较时间大小，通过毫秒比较
     *
     * @param date1
     * @param date2
     * @return
     */
    public static boolean compareTime(Date date1, Date date2) {
        Calendar cal = Calendar.getInstance();
        //第一个时间是多少毫秒
        cal.setTime(date1);
        long start = cal.getTimeInMillis();

        //第二个时间是多少毫秒
        cal.setTime(date2);
        long end = cal.getTimeInMillis();

        if (start < end) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 比较时间大小，通过毫秒比较
     *
     * @param date1
     * @param date2
     * @return
     */
    public static long compareTimeGetMillis(Date date1, Date date2) {
        Calendar cal = Calendar.getInstance();
        //第一个时间是多少毫秒
        cal.setTime(date1);
        long start = cal.getTimeInMillis();

        //第二个时间是多少毫秒
        cal.setTime(date2);
        long end = cal.getTimeInMillis();
        long millis = end - start;
        return millis;

    }

    /**
     * 设置一个日期的时分秒，2016-09-21 23:12:12替换掉你想要的时分秒
     *
     * @param time
     * @param day
     * @return
     */
    public static Date parseDate(Date time, Date day) {
        String dayStr = date2Str(day, DateUtils.date_sdf);
        String Hms = HH_MM_SS.format(time);
        String daytimeStr = dayStr + " " + Hms;
        Date dayTime = null;
        try {
            dayTime = datetimeFormat.parse(daytimeStr);
        } catch (Exception e) {
            throw new RuntimeException("DateUtils工具类:parseDate()时间格式转换出错" + e.toString());
        }
        return dayTime;
    }

    /**
     * 获取当前最大时间
     *
     * @return
     */
    public static Date getDayEndMaxTime(Date... date) {
        Calendar todayEnd = Calendar.getInstance();
        if (date.length > 0 && date[0] != null) {
            todayEnd.setTime(date[0]);
        } else {
            todayEnd.setTime(getDayStartTime());
        }
        todayEnd.set(Calendar.HOUR, 23);
        todayEnd.set(Calendar.MINUTE, 59);
        todayEnd.set(Calendar.SECOND, 59);
        todayEnd.set(Calendar.MILLISECOND, 999);
        return todayEnd.getTime();
    }

    /**
     * 获取当天开始时间
     *
     * @return
     */
    public static Date getDayStartTime(Date... date) {
        Calendar todayStart = Calendar.getInstance();
        if (date.length > 0 && date[0] != null) {
            todayStart.setTime(date[0]);
        }
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);
        todayStart.set(Calendar.SECOND, 0);
        todayStart.set(Calendar.MILLISECOND, 0);
        return todayStart.getTime();
    }

    /**
     * 获取几小时后的时间 或者几小时前
     *
     * @return
     */
    public static Date getDayAfterHous(Date date, int hous, DATA_UTLIST_TYPE_DO type) {
        Calendar todayStart = Calendar.getInstance();
        todayStart.setTime(date);
        if (type == DATA_UTLIST_TYPE_DO.ADD) {
            todayStart.set(Calendar.HOUR, todayStart.get(Calendar.HOUR) + hous);
        } else {
            todayStart.set(Calendar.HOUR, todayStart.get(Calendar.HOUR) - hous);
        }


        return todayStart.getTime();
    }

    public static Date getDayAfterDay(Date date, int days, DATA_UTLIST_TYPE_DO type) {
        Calendar todayStart = Calendar.getInstance();
        todayStart.setTime(date);
        if (type == DATA_UTLIST_TYPE_DO.ADD) {
            todayStart.set(Calendar.DATE, todayStart.get(Calendar.DATE) + days);
        } else {
            todayStart.set(Calendar.DATE, todayStart.get(Calendar.DATE) - days);
        }
        return todayStart.getTime();
    }

    public static LocalDate dateToLocalDate(Date date) {
        Instant instant = date.toInstant();
        ZoneId zone = ZoneId.systemDefault();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zone);
        LocalDate localDate = localDateTime.toLocalDate();
        return localDate;
    }

    public static int diffMonth(LocalDate date1, LocalDate date2) {
        Period period = Period.between(date1, date2);

        return period.getMonths() + period.getYears() * 12;
    }

    /**
     * 这个方法是有问题的
     *
     * @param date1 1
     * @param date2 2
     * @return 3
     */
    public static int diffDay(LocalDate date1, LocalDate date2) {
        Period period = Period.between(date1, date2);
        return period.getDays();
    }

    /**
     * 两个时间相差几个月
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int diffMonth(Date date1, Date date2) {
        return diffMonth(dateToLocalDate(date1), dateToLocalDate(date2));
    }

    public static int diffDay(Date date1, Date date2) {
        return diffDay(dateToLocalDate(date1), dateToLocalDate(date2));
    }

    /**
     * 将时间转成20161230111604
     *
     * @return
     */
    public static String date2OrderStr() {
        String dateStr = DateUtils.date2Str(datetimeFormat).replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
        return dateStr;
    }

    public static Date getAFewDaysDateTime(Date date, Integer days) {
        if (days == null) {
            return null;
        }
        Calendar calendar = getCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, days);
        return calendar.getTime();
    }

    /**
     * String类型 转换为Date,
     * 如果参数长度为10 转换格式”yyyy-MM-dd“
     * 如果参数长度为19 转换格式”yyyy-MM-dd HH:mm:ss“
     */
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if (StringUtils.hasText(text)) {
            try {
                String s = ":";
                if (!text.contains(s) && text.length() == 10) {
                    setValue(date_sdf.parse(text));
                } else if (text.indexOf(s) > 0 && text.length() == 19) {
                    setValue(datetimeFormat.parse(text));
                } else {
                    throw new IllegalArgumentException(
                            "Could not parse date, date format is error ");
                }
            } catch (ParseException ex) {
                IllegalArgumentException iae = new IllegalArgumentException(
                        "Could not parse date: " + ex.getMessage());
                iae.initCause(ex);
                throw iae;
            }
        } else {
            setValue(null);
        }
    }

    public enum DATA_UTLIST_TYPE_DO {
        ADD,
        SUB
    }

}
