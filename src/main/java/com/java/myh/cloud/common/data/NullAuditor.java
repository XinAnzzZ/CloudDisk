package com.java.myh.cloud.common.data;

import org.springframework.data.domain.AuditorAware;

/**
 * @author author
 */
public class NullAuditor implements AuditorAware {
    @Override
    public Object getCurrentAuditor() {
        return null;
    }
}
