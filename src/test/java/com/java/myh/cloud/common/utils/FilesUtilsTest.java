package com.java.myh.cloud.common.utils;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author 心安
 * @date 2018/5/28 17:29
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring.xml")
public class FilesUtilsTest {
    @Test
    public void testIsNull() {
        System.out.println(FilesUtils.INITIAL_CAPACITY);
    }
}