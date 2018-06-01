package com.java.myh.cloud.common.utils.datatable;

import com.java.myh.cloud.common.mvc.dto.BaseDto;
import com.xiaoleilu.hutool.StrUtil;
import org.springframework.util.ConcurrentReferenceHashMap;

/**
 * 排序映射
 * 经常会遇到dto 和 entity中的字段不对应的问题,在处理分页和排序的时候加入配置好的此对象进行映射。
 *
 * @author author
 */
public class OrderMapper extends BaseDto {

    private static final long serialVersionUID = 8527745717567048545L;

    private ConcurrentReferenceHashMap<String, String> orderMapperMap = new ConcurrentReferenceHashMap<>(32);

    /**
     * 添加映射
     *
     * @param key       dto中的值
     * @param mapperKey entity中的值
     */
    public void put(String key, String mapperKey) {
        this.orderMapperMap.put(key, mapperKey);
    }

    public String getMapperKey(String key) {
        String mapperKey = this.orderMapperMap.get(key);
        if (StrUtil.isNotBlank(mapperKey)) {
            return mapperKey;
        }
        return key;
    }

}
