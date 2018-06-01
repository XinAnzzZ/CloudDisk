package com.java.myh.cloud.common.utils.datatable;

import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

public class DataTableEntity<T> implements Serializable {
    private static final long serialVersionUID = 619750554320327909L;

    /**
     * 格的渲染次数
     */
    private Integer draw;

    /**
     * 表格内的数据
     */
    private List<T> data = Collections.emptyList();

    /**
     * 搜索后的返回结果
     */
    private Long recordsFiltered = 0L;
    /**
     * 总条数
     */
    private Long recordsTotal = 0L;

    public DataTableEntity() {
    }

    public DataTableEntity(Page<?> page, List<T> data) {
        this.recordsFiltered(page.getTotalElements());
        this.recordsTotal(page.getTotalElements());
        this.data = data;
    }

    public DataTableEntity(Page<T> page, TableEntity tableEntity) {
        this.recordsFiltered(page.getTotalElements());
        this.recordsTotal(page.getTotalElements());
        this.data = page.getContent();
        this.draw = tableEntity.getDraw();
    }

    public DataTableEntity(List<T> dataListDto, Page<Object> page, TableEntity tableEntity) {
        this.recordsFiltered(page.getTotalElements());
        this.recordsTotal(page.getTotalElements());
        this.data = dataListDto;
        this.draw = tableEntity.getDraw();
    }


    public DataTableEntity(Integer draw, Long recordsTotal, Long recordsFiltered, List<T> list) {
        this.draw = draw;
        this.recordsFiltered = recordsFiltered;
        this.data = list;
        this.recordsTotal = recordsTotal;
    }

    public DataTableEntity draw(Integer draw) {
        this.setDraw(draw);
        return this;
    }

    public DataTableEntity data(List<T> data) {
        this.setData(data);
        return this;
    }

    public DataTableEntity recordsFiltered(Long recordsFiltered) {
        this.setRecordsTotal(recordsFiltered);
        return this;
    }

    public DataTableEntity recordsTotal(Long recordsTotal) {
        this.setRecordsFiltered(recordsTotal);
        return this;
    }

    public Integer getDraw() {
        return draw;
    }

    public void setDraw(Integer draw) {
        this.draw = draw;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(Long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public Long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataTableEntity<?> that = (DataTableEntity<?>) o;

        if (draw != null ? !draw.equals(that.draw) : that.draw != null) return false;
        if (data != null ? !data.equals(that.data) : that.data != null) return false;
        if (recordsFiltered != null ? !recordsFiltered.equals(that.recordsFiltered) : that.recordsFiltered != null)
            return false;
        return recordsTotal != null ? recordsTotal.equals(that.recordsTotal) : that.recordsTotal == null;

    }

    @Override
    public int hashCode() {
        int result = draw != null ? draw.hashCode() : 0;
        result = 31 * result + (data != null ? data.hashCode() : 0);
        result = 31 * result + (recordsFiltered != null ? recordsFiltered.hashCode() : 0);
        result = 31 * result + (recordsTotal != null ? recordsTotal.hashCode() : 0);
        return result;
    }
}
