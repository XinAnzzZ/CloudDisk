package com.java.myh.cloud.common.utils.datatable;


import java.io.Serializable;


public class TableCoulumEntity implements Serializable {
    private static final long serialVersionUID = 8124814721013008587L;
    private String data;
    private String name;
    private Boolean searchable;
    private Boolean orderable;
    private String saerchValue;
    private Boolean searchRegex;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getSearchable() {
        return searchable;
    }

    public void setSearchable(Boolean searchable) {
        this.searchable = searchable;
    }

    public Boolean getOrderable() {
        return orderable;
    }

    public void setOrderable(Boolean orderable) {
        this.orderable = orderable;
    }

    public String getSaerchValue() {
        return saerchValue;
    }

    public void setSaerchValue(String saerchValue) {
        this.saerchValue = saerchValue;
    }

    public Boolean getSearchRegex() {
        return searchRegex;
    }

    public void setSearchRegex(Boolean searchRegex) {
        this.searchRegex = searchRegex;
    }
}
