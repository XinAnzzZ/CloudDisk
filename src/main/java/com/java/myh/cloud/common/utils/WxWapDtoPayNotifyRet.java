package com.java.myh.cloud.common.utils;

public class WxWapDtoPayNotifyRet {
    private int return_code;
    private int totalFee;
    private int channelOrderId;
    private int orderId;
    private int timeStamp;
    private int sign;
    private int attach;
    private int transactionId;

    public int getReturn_code() {
        return return_code;
    }

    public void setReturn_code(int return_code) {
        this.return_code = return_code;
    }

    public int getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(int totalFee) {
        this.totalFee = totalFee;
    }

    public int getChannelOrderId() {
        return channelOrderId;
    }

    public void setChannelOrderId(int channelOrderId) {
        this.channelOrderId = channelOrderId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(int timeStamp) {
        this.timeStamp = timeStamp;
    }

    public int getSign() {
        return sign;
    }

    public void setSign(int sign) {
        this.sign = sign;
    }

    public int getAttach() {
        return attach;
    }

    public void setAttach(int attach) {
        this.attach = attach;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "WxWapDtoPayNotifyRet{" +
                "return_code=" + return_code +
                ", totalFee=" + totalFee +
                ", channelOrderId=" + channelOrderId +
                ", orderId=" + orderId +
                ", timeStamp=" + timeStamp +
                ", sign=" + sign +
                ", attach=" + attach +
                ", transactionId=" + transactionId +
                '}';
    }
}
