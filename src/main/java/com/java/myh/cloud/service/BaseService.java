package com.java.myh.cloud.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.metamodel.SingularAttribute;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 基础类接口
 * <p>
 * <p>
 * Date: 2015/10/21
 * Time: 10:48
 *
 * @author 心安 QWQ
 */
public interface BaseService<T, ID extends Serializable> {
    /**
     * 创建数据保存数据之前额外操作回调方法 默认为空逻辑，子类根据需要覆写添加逻辑即可
     *
     * @param entity 待创建数据对象
     */
    void preInsert(T entity);


    /**
     * 更新数据保存数据之前额外操作回调方法 默认为空逻辑，子类根据需要覆写添加逻辑即可
     *
     * @param entity 待更新数据对象
     */
    void preUpdate(T entity);

    /**
     * 保存一个对象
     *
     * @param entity 对象
     * @return 返回新对象
     */
    T save(T entity);

    /**
     * 批量数据保存操作 其实现只是简单循环集合每个元素调用
     * 并无实际的Batch批量处理，如果需要数据库底层批量支持请自行实现
     *
     * @param entities 待批量操作数据集合
     * @return list
     */
    List<T> save(Iterable<T> entities);

    /**
     * 获取某个字段的最大值
     *
     * @param column 字段(meta model)
     * @return number
     */
    Number getColumnMaxValue(SingularAttribute<T, ? extends Number> column);

    boolean exists(ID id);

    void delete(ID id);

    void delete(T entity);

    void delete(Iterable<? extends T> entities);

    Integer deleteIds(Collection<ID> ids);

    Integer deleteIds(ID[] ids);

    void deleteInBatch(Iterable<T> entities);

    void deleteAll();

    Long count();

    Long count(Specification<T> specification);

    T findById(ID id);

    T findOne(Specification<T> specification);

    List<T> findAll();

    List<T> findAll(Iterable<ID> ids);

    List<T> findAll(Sort sort);

    List<T> findAll(Specification<T> specification);

    List<T> findAll(Specification<T> specification, Sort sort);

    Page<T> findAll(Pageable pageable);

    Page<T> findAll(Specification<T> specification, Pageable pageable);

    /**
     * 查询所有数据,只带id以及name两个字段
     */
    List<Map<String, Object>> getIdNames();

    /**
     * 查询所有数据,但只查询需要的字段
     *
     * @param properties 需要哪些字段
     * @return list
     */
    List<Map<String, Object>> findAllByProperties(String... properties);

    /**
     * 按照条件查询数据,只查询需要的字段
     *
     * @param specification specification
     * @param properties    需要哪些字段
     */
    List<Map<String, Object>> findAllByProperties(Specification<T> specification, String... properties);

    /**
     * 按照条件查询数据,只查询需要的字段,并处理分页以及排序
     *
     * @param specification specification
     * @param pageable      page
     * @param properties    需要哪些字段
     * @return page
     */
    Page<Map<String, Object>> findAllByProperties(Specification<T> specification, Pageable pageable, String... properties);

}
