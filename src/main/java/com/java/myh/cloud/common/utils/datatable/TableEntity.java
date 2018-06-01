package com.java.myh.cloud.common.utils.datatable;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @author author
 */
public class TableEntity implements Serializable {
    private static final long serialVersionUID = -2771316929044285912L;

    /**
     * Draw counter. This is used by DataTables to ensure that the Ajax returns from server-side
     * processing requests are drawn in sequence by DataTables (Ajax requests are asynchronous and
     * thus can return out of sequence). This is used as part of the draw return parameter (see
     * below).
     */
    @NotNull
    @Min(0)
    private Integer draw;

    /**
     * Paging first record indicator. This is the start point in the current data set (0 index based -
     * i.e. 0 is the first record).
     */
    @NotNull
    @Min(0)
    private Integer length;

    /**
     * Number of records that the table can display in the current draw. It is expected that the
     * number of records returned will be equal to this number, unless the server has fewer records to
     * return. Note that this can be -1 to indicate that all records should be returned (although that
     * negates any benefits of server-side processing!)
     */
    @NotNull
    @Min(-1)
    private Integer start;


    /**
     * Order parameter
     */
    @NotEmpty
    private TableOrderParameter order;

    public TableEntity() {
        this.draw = 1;
        this.start = 0;
        this.length = 10;
        this.order = new TableOrderParameter();
    }

    /**
     * 根据data tables传过来的开始条数和需要数,获取需要请求的页数
     *
     * @return 请求页数
     */
    public Integer getNumPage() {
        // 如果开始条数为0 表示为请求第一页
        Integer numPage = (start == 0) ? 1 : (start / length) + 1;
        // spring data jpa 处理页数需减一
        return numPage - 1;
    }

    public Integer getDraw() {
        return draw;
    }

    public void setDraw(Integer draw) {
        this.draw = draw;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public TableOrderParameter getOrder() {
        return order;
    }

    public void setOrder(TableOrderParameter order) {
        this.order = order;
    }

}

