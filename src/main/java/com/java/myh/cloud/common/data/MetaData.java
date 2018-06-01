package com.java.myh.cloud.common.data;

import java.lang.annotation.*;

/**
 * 用于注解类或属性的元数据，这些元数据可用于代码生成或运行时动态内容生成
 * <p>
 * Date: 2015/10/28
 * Time: 15:07
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD, ElementType.PACKAGE, ElementType.PARAMETER})
public @interface MetaData {

    /**
     * 简要注解说明：一般对应表单项Label属性显示
     */
    String value();

    /**
     * 提示信息：一般对应表单项的提示说明，支持以HTML格式
     */
    String tooltips() default "";

    /**
     * 注释说明：用于描述代码内部用法说明，一般不用于前端UI显示
     */
    String comments() default "";

    /**
     * 各种规范指定的代码
     * 比如上传到医保局里 住院(IHOS) 在我们的数据库里 就存"INHOS" 这个字符串,需要用到规范的地方就使用 规范值
     * <p>
     * exp : 入院类型
     * <p>
     * public enum INHOS_TYPE {
     *
     * @MetaData(value = "住院",specificationInt = 2)
     * INHOS,
     * @MetaData(value = "生育住院",specificationInt= 7)
     * GIVEBIRTH_INHOS
     * }
     * <p>
     * 读取枚举类型的意义: AnnotationUtil.getMetaValue(INHOS_TYPE.INHOS)              -> 住院
     * 读取标准代码(int) : AnnotationUtil.getMetaSpecificationInt(INHOS_TYPE.INHOS)   -> 2
     */
    int specificationInt() default -999;

    /**
     * 各种规范指定的代码(字符串类型),功能同上
     * <code>
     *
     * @MetaData(value = "住院",specificationString = "ACK001")
     * INHOS
     * </code>
     * 读取标准代码(string) : AnnotationUtil.getMetaSpecificationString(INHOS_TYPE.INHOS)    ->  ACK001
     */
    String specificationString() default "";

}
