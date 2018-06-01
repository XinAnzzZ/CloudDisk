package com.java.myh.cloud.common.utils.datatable;

import com.xiaoleilu.hutool.StrUtil;
import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

/**
 * @author author
 */
public class DataTablesUtils {

    /**
     * 默认排序字段
     */
    private final static String DEFAULT_ORDER_COLUMN = "id";
    /**
     * 默认排序方向
     */
    private final static Sort.Direction DEFAULT_ORDER_DIRECTION = Sort.Direction.ASC;

    /**
     * 自动获取data tables表格的分页排序
     * 如果没有需要排序的字段,则使用默认的排序字段以及方向
     * 如果传入的length(每页数量)为 -1 , 则查询所有,不进行分页
     *
     * @param tableEntity datatables tableEntity
     * @return spring data pageable
     */
    public static Pageable getPageable(TableEntity tableEntity) {
        if (tableEntity.getOrder() != null
                && StringUtils.isNotBlank(tableEntity.getOrder().getColumn())
                && StringUtils.isNotBlank(tableEntity.getOrder().getDir())) {
            return getPageable(tableEntity, tableEntity.getOrder().getColumn(), Sort.Direction.fromString(tableEntity.getOrder().getDir().toUpperCase()), null);
        }
        return getPageable(tableEntity, DEFAULT_ORDER_COLUMN, DEFAULT_ORDER_DIRECTION, null);
    }

    /**
     * 自动获取datatables表格的分页排序
     * 如果没有需要排序的字段,则使用默认的排序字段以及方向
     * 如果传入的length(每页数量)为 -1 , 则查询所有,不进行分页
     *
     * @param tableEntity datatables tableEntity
     * @param orderMapper 排序映射
     * @return spring data pageable
     */
    public static Pageable getPageable(TableEntity tableEntity, OrderMapper orderMapper) {
        return getPageable(tableEntity, DEFAULT_ORDER_COLUMN, DEFAULT_ORDER_DIRECTION, orderMapper);
    }

    /**
     * 自动获取datatables表格的分页排序
     * 如果传入的length(每页数量)为 -1 , 则查询所有,不进行分页
     *
     * @param tableEntity           datatables tableEntity
     * @param defaultOrderColumn    如果没有需要排序的字段,需要默认的排序字段
     * @param defaultOrderDirection 如果没有需要排序的字段,需要默认的排序方向
     * @return spring data pageable
     */
    public static Pageable getPageable(TableEntity tableEntity, String defaultOrderColumn, Sort.Direction defaultOrderDirection) {
        return getPageable(tableEntity, defaultOrderColumn, defaultOrderDirection, null);
    }


    /**
     * 自动获取datatables表格的分页排序
     * 如果传入的length(每页数量)为 -1 , 则查询所有,不进行分页
     *
     * @param tableEntity           datatables tableEntity
     * @param defaultOrderColumn    如果没有需要排序的字段,需要默认的排序字段
     * @param defaultOrderDirection 如果没有需要排序的字段,需要默认的排序方向
     * @param orderMapper           排序映射
     * @return spring data pageable
     */
    public static Pageable getPageable(TableEntity tableEntity, String defaultOrderColumn, Sort.Direction defaultOrderDirection, OrderMapper orderMapper) {
        Sort sort = getOrder(tableEntity, defaultOrderColumn, defaultOrderDirection, orderMapper);

        // 查询所有
        if (tableEntity.getLength() == -1) {
            tableEntity.setStart(0);
            tableEntity.setLength(Integer.MAX_VALUE);
        }

        return new DataTablesPageRequest(tableEntity.getStart(), tableEntity.getLength(), sort);
    }


    /**
     * 自动获取datatables表格的分页排序
     * 如果传入的length(每页数量)为 -1 , 则查询所有,不进行分页
     *
     * @param tableEntity datatables tableEntity
     * @param defaultSort 默认排序方法
     * @return spring data pageable
     */
    public static Pageable getPageable(TableEntity tableEntity, Sort defaultSort) {
        Sort sort = getOrder(tableEntity, defaultSort);

        // 查询所有
        if (tableEntity.getLength() == -1) {
            tableEntity.setStart(0);
            tableEntity.setLength(Integer.MAX_VALUE);
        }

        return new DataTablesPageRequest(tableEntity.getStart(), tableEntity.getLength(), sort);
    }

    /**
     * 自动获取datatables的排序(不进行分页)
     * 如果没有需要排序的字段,则使用默认的排序字段以及方向
     *
     * @param tableEntity datatables tableEntity
     * @return spring data sort
     */
    public static Sort getOrder(TableEntity tableEntity) {
        return getOrder(tableEntity, DEFAULT_ORDER_COLUMN, DEFAULT_ORDER_DIRECTION, null);
    }


    /**
     * 自动获取datatables的排序(不进行分页)
     *
     * @param tableEntity           datatables tableEntity
     * @param defaultOrderColumn    如果没有需要排序的字段,需要默认的排序字段
     * @param defaultOrderDirection 如果没有需要排序的字段,需要默认的排序方向
     * @param orderMapper           排序映射
     * @return spring data sort
     */
    public static Sort getOrder(TableEntity tableEntity, String defaultOrderColumn, Sort.Direction defaultOrderDirection, OrderMapper orderMapper) {
        List<Sort.Order> orders = processOrders(tableEntity, orderMapper);

        Sort sort = null;
        if (orders.isEmpty()) {
            if (StrUtil.isNotBlank(defaultOrderColumn) && defaultOrderDirection != null) {
                // 如果没有指定排序字段,则采用默认排序
                sort = new Sort(defaultOrderDirection, defaultOrderColumn);
            }
        } else {
            sort = new Sort(orders);
        }

        return sort;
    }

    /**
     * 自动获取datatables的排序(不进行分页)
     *
     * @param tableEntity datatables tableEntity
     * @param defaultSort 默认排序方法
     * @return spring data sort
     */
    public static Sort getOrder(TableEntity tableEntity, Sort defaultSort) {
        return getOrder(tableEntity, defaultSort, null);
    }


    /**
     * 自动获取datatables的排序(不进行分页)
     *
     * @param tableEntity datatables tableEntity
     * @param defaultSort 默认排序方法
     * @param orderMapper 排序映射
     * @return spring data sort
     */
    public static Sort getOrder(TableEntity tableEntity, Sort defaultSort, OrderMapper orderMapper) {
        List<Sort.Order> orders = processOrders(tableEntity, orderMapper);

        Sort sort = null;
        if (orders.isEmpty()) {
            if (defaultSort != null) {
                // 如果没有指定排序字段,则采用默认排序
                sort = defaultSort;
            }
        } else {
            sort = new Sort(orders);
        }

        return sort;
    }

    /**
     * 读取传上来的参数里面需要排序的字段以及方向
     *
     * @param tableEntity tableEntity
     * @return List<Sort.Order>
     */
    public static List<Sort.Order> processOrders(TableEntity tableEntity, OrderMapper orderMapper) {
        List<Sort.Order> orders = new ArrayList<>();

//        for (TableOrderParameter order : tableEntity.getOrder()) {
//            TableColumnParameter column = tableEntity.getColumns().get(order.getColumn());
//            if (column.getOrderable()) {
//                String sortColumn;
//                // 如果orderMapper不为空,并且能读取到对应的mapper字段,那就有限采用orderMapper的
//                if (orderMapper != null
//                        && StrUtil.isNotBlank(orderMapper.getMapperKey(column.getData()))) {
//                    sortColumn = orderMapper.getMapperKey(column.getData());
//                } else {
//                    // 如果有指定该字段的mapper 则使用mapper进行排序
//                    sortColumn = (StrUtil.isNotBlank(column.getMapper())) ?
//                            column.getMapper().replace("_", ".") :
//                            column.getData().replace("_", ".");
//                }
//                Sort.Direction sortDirection = Sort.Direction.fromString(order.getDir());
//                orders.add(new Sort.Order(sortDirection, sortColumn));
//            }
//        }
        return orders;
    }

    /**
     * spring data jpa 带了一个{@link org.springframework.data.domain.Pageable}的实现{@link org.springframework.data.domain.PageRequest}
     * 但是PageRequest构造需要传入page参数,再由{@link org.springframework.data.domain.AbstractPageRequest#getOffset} 来计算offset(开始行)
     * datatables传过来的就是一个offset而不会传页数过来,所以自己实现了Pageable
     */
    private static class DataTablesPageRequest implements Pageable {

        private final int offset;
        private final int pageSize;
        private final Sort sort;

        public DataTablesPageRequest(int offset, int pageSize, Sort sort) {
            this.offset = offset;
            this.pageSize = pageSize;
            this.sort = sort;
        }

        @Override
        public int getOffset() {
            return offset;
        }

        @Override
        public int getPageSize() {
            return pageSize;
        }

        @Override
        public Sort getSort() {
            return sort;
        }

        @Override
        public Pageable next() {
            throw new UnsupportedOperationException();
        }

        @Override
        public Pageable previousOrFirst() {
            throw new UnsupportedOperationException();
        }

        @Override
        public Pageable first() {
            throw new UnsupportedOperationException();
        }

        @Override
        public boolean hasPrevious() {
            throw new UnsupportedOperationException();
        }

        @Override
        public int getPageNumber() {
            throw new UnsupportedOperationException();
        }
    }

}
