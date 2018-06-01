package com.java.myh.cloud.common.utils;

import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.repository.FilesRepository;
import com.java.myh.cloud.service.FilesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * @author 心安 QWQ
 */
@Component
public class FilesUtils {
    /**
     * 用于表示用户的初始容量，以B为单位，这里表示1GB,1073741824B
     * 通过 @Value 注入静态变量时，需要手动加入“ 非静态的 ” setter
     * 因为如果是静态的set方法，属于类的属性，而非静态的set方法是普通的对象的方法
     */
    public static String INITIAL_CAPACITY;

    /**
     * 保存文件的根目录
     */
    private static String ROOT_FOLDER;

    /**
     * 文件类型
     */
    private static String picture;

    private static String document;

    private static String music;

    private static String video;

    /**
     * 将上传的文件保存到文件库
     *
     * @return 返回文件在文件库中存放的位置和保存在文件库中的文件名称
     */
    public static String saveFile(MultipartFile file) throws IOException {
        File rootFile = new File(ROOT_FOLDER);
        String fileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        //得到文件保存在文件库的名称，通过uuid连接
        String saveName = uuid + "_" + fileName;
        //通过hashCode生成方式来生成文件保存的目录
        String hexString = Integer.toHexString(saveName.hashCode());
        File dirFile = new File(rootFile,
                hexString.charAt(0) + File.separator + hexString.charAt(1));
        if (!dirFile.exists()) {
            dirFile.mkdirs();
        }
        //生成目标文件
        File destinationFile = new File(dirFile, saveName);
        //保存
        file.transferTo(destinationFile);
        return ROOT_FOLDER + hexString.charAt(0) + File.separator
                + hexString.charAt(1) + File.separator + saveName;
    }

    /**
     * 得到文件的类型
     * 通过扩展名进行比较，虽然这种方式很傻比，但是还挺省事。
     */
    public static FilesDO.FileTypeEnum getFileType(MultipartFile file) {
        String extensionName = file.getOriginalFilename().split("\\.")[1];

        String[] pic = picture.split(",");
        List<String> picList = Arrays.asList(pic);
        if (picList.contains(extensionName)) {
            return FilesDO.FileTypeEnum.Picture;
        }

        String[] documentArray = document.split(",");
        List<String> documentList = Arrays.asList(documentArray);
        if (documentList.contains(extensionName)) {
            return FilesDO.FileTypeEnum.Document;
        }

        String[] musicArray = music.split(",");
        List<String> musicList = Arrays.asList(musicArray);
        if (musicList.contains(extensionName)) {
            return FilesDO.FileTypeEnum.Music;
        }

        String[] videoArray = video.split(",");
        List<String> videoList = Arrays.asList(videoArray);
        if (videoList.contains(extensionName)) {
            return FilesDO.FileTypeEnum.Video;
        }

        return FilesDO.FileTypeEnum.Other;
    }

    /**
     * 为了解决文件或者文件名称重复的算法
     *
     * @param userId   用户的id
     * @param fatherId 当前文件所在的父目录的id
     * @param whether  是文件夹还是文件
     * @param fileName 文件名称
     */
    public static String getFileName(
            FilesService filesService,
            Integer userId, Integer fatherId,
            FilesDO.Whether whether, String fileName) {
        String dot = ".";
        //定义一个扩展名用于保存扩展名变量，如果是文件夹，则为""
        String extension = "";
        //保存文件名称
        String name;
        //若文件或者文件夹包含“.”，那么就对名称进行分割
        if (fileName.contains(dot)) {
            name = fileName.substring(0, fileName.lastIndexOf("."));
            //扩展名前面加上“.”
            extension = dot + fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
        } else {
            name = fileName;
        }
        int i = 0;
        while (filesService.findFileByFileName(userId, fatherId, whether, fileName) != null) {
            i++;
            fileName = name + "(" + i + ")" + extension;
        }
        return fileName;
    }

    /**
     * 减少容量
     *
     * @param capacity 容量：以B为单位
     * @param size     文件大小：以B为单位
     * @return 返回容量减去文件大小后的容量：以B为单位
     */
    public static String subtractCapacity(String capacity, Long size) {
        Long l = Long.valueOf(capacity.substring(0, capacity.indexOf("B")));
        return l - size + "B";
    }

    public static String sumCapacity(String capacity, Long size) {
        Long l = Long.valueOf(capacity.substring(0, capacity.indexOf("B")));
        return l + size + "B";
    }

    /**
     * 删除单个文件
     */
    public static void deleteFiles(FilesRepository filesRepository, FilesDO filesDO) {
        //从文件库服务器硬盘删除
        new File(filesDO.getLocation()).delete();
        //从数据库中删除
        filesRepository.deleteById(filesDO.getId());
    }

    public static String getCapacityPercentage(String usedCapacity, String totalCapacity) {
        BigDecimal used = new BigDecimal(usedCapacity.substring(0, usedCapacity.indexOf("B")));
        BigDecimal total = new BigDecimal(totalCapacity.substring(0, totalCapacity.indexOf("B")));
        BigDecimal result = used.multiply(new BigDecimal("100")).divide(total, 2, BigDecimal.ROUND_HALF_DOWN);
        return new DecimalFormat("#.00").format(result);
    }

    public static void main(String[] args) {
        BigInteger a = new BigInteger("A".getBytes());
        System.out.println(a);
    }

    @Value("${initialCapacity}")
    public void setInitialCapacity(String initialCapacity) {
        INITIAL_CAPACITY = initialCapacity;
    }

    @Value("${rootFolder}")
    public void setRootFolder(String rootFolder) {
        ROOT_FOLDER = rootFolder;
    }

    @Value("${type.picture}")
    public void setPicture(String picture) {
        FilesUtils.picture = picture;
    }

    @Value("${type.document}")
    public void setDocument(String document) {
        FilesUtils.document = document;
    }

    @Value("${type.music}")
    public void setMusic(String music) {
        FilesUtils.music = music;
    }

    @Value("${type.video}")
    public void setVideo(String video) {
        FilesUtils.video = video;
    }
}
