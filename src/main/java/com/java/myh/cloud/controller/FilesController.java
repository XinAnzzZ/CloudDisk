package com.java.myh.cloud.controller;

import com.java.myh.cloud.common.utils.DateUtils;
import com.java.myh.cloud.common.utils.FilesUtils;
import com.java.myh.cloud.common.utils.Result;
import com.java.myh.cloud.common.utils.datatable.DataTableEntity;
import com.java.myh.cloud.common.utils.datatable.DataTablesUtils;
import com.java.myh.cloud.common.utils.datatable.TableEntity;
import com.java.myh.cloud.common.utils.img.VerifyCodeUtils;
import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.core.entity.ShareFiles;
import com.java.myh.cloud.service.FilesService;
import com.java.myh.cloud.service.ShareFilesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.*;


/**
 * @author 心安 QWQ
 */
@Controller
@RequestMapping("/files")
public class FilesController extends BaseController {

    @Resource
    private ShareFilesService shareFilesService;
    @Resource
    private FilesService filesService;
    @Value("${rootFolder}")
    private String rootFolder;

    /**
     * 文件分享页面
     */
    @RequestMapping("/share/page")
    public String sharePage(Integer fileId) {
        model.addAttribute("fileId", fileId);
        return "user/share";
    }

    /**
     * 文件分享控制器
     */
    @PostMapping("/share/file")
    @ResponseBody
    public Result shareFile(Integer fileId, String isEncrypt, ShareFiles.DateEnum termOfValidity) {
        ShareFiles.Whether whether = "加密".equals(isEncrypt) ? ShareFiles.Whether.YES : ShareFiles.Whether.NO;
        ShareFiles shareFiles = new ShareFiles();
        FilesDO filesDO = new FilesDO();
        filesDO.setId(fileId);
        shareFiles.setFilesDO(filesDO);
        shareFiles.setIsEncrypt(whether);
        shareFiles.setShareDate(new Date());
        shareFiles.setTermOfValidity(termOfValidity);
        String sign = UUID.randomUUID().toString().replace("-", "");
        shareFiles.setSign(sign);
        shareFiles.setUser(getUser());
        shareFiles.setCount(0);
        Integer termOfValidityName = termOfValidity.getName();
        shareFiles.setIsCancel(ShareFiles.Whether.NO);
        shareFiles.setExpiryDate(DateUtils.getAFewDaysDateTime(new Date(), termOfValidityName));
        String password = "";
        if (whether == ShareFiles.Whether.YES) {
            password = VerifyCodeUtils.generateVerifyCode(4);
            shareFiles.setPassword(password);
        }
        shareFilesService.saveShareFiles(shareFiles);
        Result result = new Result();
        result.setData(sign);
        result.setMessage(password);
        return result;
    }

    /**
     * 取消文件分享
     */
    @ResponseBody
    @PostMapping("/cancel/share")
    public Result cancelShare(Integer id) {
        ShareFiles shareFiles = shareFilesService.findById(id);
        shareFiles.setIsCancel(ShareFiles.Whether.YES);
        shareFilesService.save(shareFiles);
        return Result.ok();
    }

    /**
     * 文件分享的接口
     */
    @RequestMapping("/share/link/sign/{sign}")
    public String shareLink(@PathVariable String sign, HttpSession session) {
        ShareFiles shareFiles = shareFilesService.findBySign(sign);
        if (shareFiles == null) {
            return "/error/404";
        }
        model.addAttribute("shareFiles", shareFiles);
        Boolean valid = session.getAttribute("valid") == null;
        Boolean yes = shareFiles.getIsEncrypt() == ShareFiles.Whether.YES;
        Boolean flag = (valid && yes);
        if (flag) {
            return "/user/share/validatePassword";
        }
        shareFiles.setCount(shareFiles.getCount() + 1);
        shareFilesService.saveShareFiles(shareFiles);
        return "/user/share/sharedFile";
    }

    /**
     * 加密文件的密码校验
     */
    @ResponseBody
    @RequestMapping("/validate/file/password")
    public Result validateFilePassword(String password, Integer fileId, HttpSession session) {
        ShareFiles shareFiles = shareFilesService.findById(fileId);
        if (shareFiles.getPassword().equalsIgnoreCase(password)) {
            session.setAttribute("valid", "valid");
            shareFiles.setCount(shareFiles.getCount() + 1);
            shareFilesService.saveShareFiles(shareFiles);
            return Result.ok();
        }
        return Result.fail();
    }

    /**
     * 分享文件的下载
     */
    @RequestMapping("/file/download")
    @ResponseBody
    public void fileDownload(Integer fileId, HttpServletResponse response) throws Exception {
        FilesDO filesDO = filesService.findById(fileId);
        String filePath = filesDO.getLocation();
        File file = new File(filePath);

        InputStream fileInputStream = new BufferedInputStream(new FileInputStream(file));
        response.reset();
        //设置响应头
        response.setContentType("application/x-download");
        //设置响应头
        response.addHeader("Content-Disposition", "attachment;filename=" +
                new String(filesDO.getFileName()
                        .getBytes("UTF-8"), "iso-8859-1"));
        response.addHeader("Content-Length", "" + file.length());
        OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
        byte[] buffer = new byte[1024 * 1024 * 4];
        int i;
        while ((i = fileInputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, i);
        }
        fileInputStream.close();
        outputStream.flush();
        outputStream.close();
        response.wait();
    }

    /**
     * 打开重命名页面
     */
    @GetMapping("/open/rename/page")
    public String openRenamePage(Integer fileId) {
        model.addAttribute("fileId", fileId);
        return "user/file/rename";
    }

    /**
     * 文件重命名控制器
     */
    @ResponseBody
    @PostMapping("/rename")
    public Result rename(String filename, Integer fileId) {
        FilesDO filesDO = filesService.findFileById(fileId);
        //如果这个filesDO不是文件夹，那么他的文件名应该是用户修改的文件名加上扩展名
        if (Objects.equals(FilesDO.Whether.NO, filesDO.getIsFolder())) {
            String dot = ".";
            filename = filename + dot + filesDO.getExtensionName();
        }
        String newFilename = FilesUtils.getFileName(filesService, getUser().getId(), filesDO.getFatherId(), filesDO.getIsFolder(), filename);
        filesDO.setFileName(newFilename);
        filesService.save(filesDO);
        return Result.ok("修改成功！");
    }

    /**
     * 打开移动文件页面
     */
    @RequestMapping("/open/move/page")
    public String openMovePage(@RequestParam("fileId[]") Integer[] fileId) {
        model.addAttribute("fileIdArray", Arrays.toString(fileId));
        return "user/file/moveFile";
    }

    /**
     * 获取树的节点
     */
    @ResponseBody
    @PostMapping("/get/tree/nodes")
    public List<FilesDO> getTreeNodes(Integer fatherId) {
        return filesService.getAllFolder(getUser(), fatherId);
    }

    /**
     * 移动文件控制器
     */
    @ResponseBody
    @PostMapping("/move/files")
    public Result moveFiles(@RequestParam("fileId[]") Integer[] fileId, Integer fatherId) {
        filesService.moveFileByFilesId(fileId, fatherId);
        return Result.ok("移动成功！");
    }

    /**
     * 图片页面
     */
    @GetMapping("/to/picture/page")
    public String toPicturePage() {
        List<FilesDO> pictureList = filesService.getAllPicture(getUser());
        model.addAttribute("pictureList", pictureList);
        return "/user/file/pictureList";
    }

    /**
     * 图片的加载
     */
    @RequestMapping("/pic/{picId}")
    public void getPicture(
            @PathVariable("picId") Integer id,
            HttpServletResponse response
    ) {
        String location = filesService.findById(id).getLocation();
        FileInputStream fileInputStream = null;
        OutputStream outputStream;
        try {
            fileInputStream = new FileInputStream(location);
            outputStream = response.getOutputStream();
            int count;
            byte[] buffer = new byte[1024 * 8];
            while ((count = fileInputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, count);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //servlet的输出流不需要关闭
            if (fileInputStream != null) {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 视频页面
     */
    @GetMapping("/to/video/page")
    public String toVideoPage() {
        return "/user/file/videoList";
    }

    /**
     * 视频页面数据
     */
    @ResponseBody
    @PostMapping("/video/data")
    public DataTableEntity videoData(TableEntity tableEntity) {
        Page<FilesDO> videoPage = filesService
                .getAllFilesByFileType(getUser(), FilesDO.FileTypeEnum.Video, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(videoPage, tableEntity);
    }

    /**
     * 视频播放页面
     */
    @RequestMapping("/video/{id}")
    public String video(@PathVariable("id") Integer id) {
        model.addAttribute("id", id);
        return "/user/file/video";
    }

    /**
     * 视频播放
     */
    @ResponseBody
    @RequestMapping("/video/player/{id}")
    public Result videoPlayer(@PathVariable("id") Integer id) {
        String location = filesService.findById(id).getLocation();
        String substring = location.substring(rootFolder.length());
        return new Result(true, substring);
    }

    /**
     * 文档页面
     */
    @GetMapping("/to/document/page")
    public String toDocumentPage() {
        return "/user/file/documentList";
    }

    /**
     * 文档页面数据
     */
    @PostMapping("/document/data")
    @ResponseBody
    public DataTableEntity documentData(TableEntity tableEntity) {
        Page<FilesDO> filesPage = filesService
                .getAllFilesByFileType(getUser(), FilesDO.FileTypeEnum.Document, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(filesPage, tableEntity);
    }

    /**
     * 其他页面
     */
    @GetMapping("/to/other/page")
    public String toOtherPage() {
        return "/user/file/otherList";
    }

    /**
     * 其他页面数据
     */
    @PostMapping("/other/data")
    @ResponseBody
    public DataTableEntity otherData(TableEntity tableEntity) {
        Page<FilesDO> filesPage = filesService
                .getAllFilesByFileType(getUser(), FilesDO.FileTypeEnum.Other, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(filesPage, tableEntity);
    }

    /**
     * 音乐列表页面
     */
    @GetMapping("/to/music/page")
    public String toMusicPage() {
        return "/user/file/musicList";
    }

    /**
     * 音乐页面数据
     */
    @PostMapping("/music/data")
    @ResponseBody
    public DataTableEntity musicData(TableEntity tableEntity) {
        Page<FilesDO> filesPage = filesService
                .getAllFilesByFileType(getUser(), FilesDO.FileTypeEnum.Music, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(filesPage, tableEntity);
    }

    /**
     * 音乐播放弹窗页面
     */
    @RequestMapping("/music/{id}")
    public String musicPage(@PathVariable Integer id) {
        model.addAttribute("id", id);
        return "/user/file/music";
    }

    /**
     * 分享列表页面
     */
    @GetMapping("/share/list/page")
    public String shareListPage() {
        return "/user/shareList";
    }

    /**
     * 分享列表数据
     */
    @ResponseBody
    @PostMapping("/share/list/data")
    public DataTableEntity<ShareFiles> shareListData(
            TableEntity tableEntity,
            @RequestParam(required = false, defaultValue = "") String filename,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate
    ) {
        Page<ShareFiles> allByCondition = shareFilesService.findAllByCondition(getUser(), filename, startDate, endDate, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(allByCondition, tableEntity);
    }
}